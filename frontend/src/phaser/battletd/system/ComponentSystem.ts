import Phaser from 'phaser'
import short from 'short-uuid'

export type Constructor<T extends {} = {}> = new (...args: any[]) => T

export interface IComponent {
  init(gameObject: Phaser.GameObjects.GameObject, components: ComponentSystem): void
  awake?: () => void
  start?: () => void
  update?: (dt: number) => void
  destroy?: () => void
}

export interface IComponentSystem {
  addComponent(go: Phaser.GameObjects.GameObject, component: IComponent): void
  findComponent<ComponentType>(go: Phaser.GameObjects.GameObject, componentType: Constructor<ComponentType>): ComponentType | undefined
  removeComponent(go: Phaser.GameObjects.GameObject, component: IComponent): void
  destroy(): void
  update(dt: number): void
}

// thanks to ourcade: https://github.com/ourcade/phaser3-bomb-attack/blob/master/src/services/ComponentService.ts
// tutorial: https://www.youtube.com/watch?v=qzsbGLghrMM
export default class ComponentSystem implements IComponentSystem {
  private componentsByGameObject = new Map<string, IComponent[]>();
  private queuedForStart: IComponent[] = [];

  addComponent(gameObject: Phaser.GameObjects.GameObject, component: IComponent) {
    if (!gameObject.name) {
      gameObject.name = short.generate();
    }
    if (!this.componentsByGameObject.has(gameObject.name)) {
      this.componentsByGameObject.set(gameObject.name, []);
    }

    const componentList = this.componentsByGameObject.get(gameObject.name);
    componentList!.push(component);
    component.init(gameObject, this);

    component.awake?.()
    if (component.start) {
      this.queuedForStart.push(component);
    }
  }

  removeComponent(gameObject: Phaser.GameObjects.GameObject, component: IComponent) {
    if (!gameObject.name) {
      return;
    }
    if (!this.componentsByGameObject.has(gameObject.name)) {
      return;
    }

    const list = this.componentsByGameObject.get(gameObject.name) as IComponent[];
    const index = list.findIndex(c => c === component);

    if (index < 0) {
      return;
    }

    list.splice(index, 1);

    component.destroy?.();
  }

  findComponent<ComponentType>(go: Phaser.GameObjects.GameObject, componentType: Constructor<ComponentType>) {
    const components = this.componentsByGameObject.get(go.name) ?? [];
    return components.find(component => component instanceof componentType) as ComponentType | undefined;
  }

  destroy() {
    this.componentsByGameObject.forEach(components => {
      components.forEach(component => {
        component.destroy?.();
      });
    });
  }

  update(dt: number) {
    while (this.queuedForStart.length > 0) {
      this.queuedForStart.shift()?.start?.();
    }

    this.componentsByGameObject.forEach(components => {
      components.slice().forEach(component => {
        component.update?.(dt);
      });
    });
  }
}