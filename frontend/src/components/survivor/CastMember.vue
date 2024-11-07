<template>
  <div class="cast-member">
    <img :alt="name" :src="getImgUrl()" :class="{
      grey: votedOut,
      ika: tribe === 'Ika',
      vati: tribe === 'Vati',
      taku: tribe === 'Taku',
      kulakula: tribe === 'Kula Kula',
      koka: tribe === 'Koka',
      vesi: tribe === 'Vesi',
      baka: tribe === 'Baka',
      gaia: tribe === 'Gaia',
      ratu: tribe === 'Ratu',
      soka: tribe === 'Soka',
      tika: tribe === 'Tika',
      vava: tribe === 'Vava',
      gata: tribe === 'Gata',
      luvo: tribe === 'Luvo',
      tuku: tribe === 'Tuku',
      beka: tribe === 'Beka',
    }"/>
    <h3>{{ name }}</h3>
    <p>Age: {{ age }}</p>
    <p>From: {{ hometown }}</p>
    <p>Occupation: {{ occupation }}</p>
    <p>Starting Tribe: {{ startingTribe }}</p>
    <p>Tribe: {{ tribe }}</p>
  </div>
</template>

<script>
import ChanelleHowell from "@/assets/survivors/S42/ChanelleHowell.jpg";
import DanielStrunk from "@/assets/survivors/S42/DanielStrunk.jpg";
import DreaWheeler from "@/assets/survivors/S42/DreaWheeler.jpg";
import HaiGiang from "@/assets/survivors/S42/HaiGiang.jpg";
import JacksonFox from "@/assets/survivors/S42/JacksonFox.jpg";
import JennyKim from "@/assets/survivors/S42/JennyKim.jpg";
import JonathanYoung from "@/assets/survivors/S42/JonathanYoung.jpg";
import LindsayDolashewich from "@/assets/survivors/S42/LindsayDolashewich.jpg";
import LydiaMeredith from "@/assets/survivors/S42/LydiaMeredith.jpg";
import MaryanneOketch from "@/assets/survivors/S42/MaryanneOketch.jpg";
import MaryaSherron from "@/assets/survivors/S42/MaryaSherron.jpg";
import MikeTurner from "@/assets/survivors/S42/MikeTurner.jpg";
import OmarZaheer from "@/assets/survivors/S42/OmarZaheer.jpg";
import RocksroyBailey from "@/assets/survivors/S42/RocksroyBailey.jpg";
import RomeoEscobar from "@/assets/survivors/S42/RomeoEscobar.jpg";
import SwatiGoel from "@/assets/survivors/S42/SwatiGoel.jpg";
import ToriMeehan from "@/assets/survivors/S42/ToriMeehan.jpg";
import ZachWurtenberger from "@/assets/survivors/S42/ZachWurtenberger.jpg";
import CassidyClark from "@/assets/survivors/S43/CassidyClark.jpg";
import CodyAssenmacher from "@/assets/survivors/S43/CodyAssenmacher.jpg";
import DwightMoore from "@/assets/survivors/S43/DwightMoore.jpg";
import ElieScott from "@/assets/survivors/S43/ElieScott.jpg";
import GeoBustamante from "@/assets/survivors/S43/GeoBustamante.jpg";
import JamesJones from "@/assets/survivors/S43/JamesJones.jpg";
import JeanineZheng from "@/assets/survivors/S43/JeanineZheng.jpg";
import JesseLopez from "@/assets/survivors/S43/JesseLopez.jpg";
import JustineBrennan from "@/assets/survivors/S43/JustineBrennan.jpg";
import KarlaCruzGodoy from "@/assets/survivors/S43/KarlaCruzGodoy.jpg";
import LindsayCarmine from "@/assets/survivors/S43/LindsayCarmine.jpg";
import MikeGabler from "@/assets/survivors/S43/MikeGabler.jpg";
import MorriahYoung from "@/assets/survivors/S43/MorriahYoung.jpg";
import NnekaEjere from "@/assets/survivors/S43/NnekaEjere.jpg";
import NoelleLambert from "@/assets/survivors/S43/NoelleLambert.jpg";
import OwenKnight from "@/assets/survivors/S43/OwenKnight.jpg";
import RyanMedrano from "@/assets/survivors/S43/RyanMedrano.jpg";
import SamiLayadi from "@/assets/survivors/S43/SamiLayadi.jpg";
import BrandonCottom from "@/assets/survivors/S44/BrandonCottom.jpg";
import BrucePerreault from "@/assets/survivors/S44/BrucePerreault.jpg";
import CarolynWiger from "@/assets/survivors/S44/CarolynWiger.jpg";
import CarsonGarrett from "@/assets/survivors/S44/CarsonGarrett.jpg";
import ClaireRafson from "@/assets/survivors/S44/ClaireRafson.jpg";
import DannyMassa from "@/assets/survivors/S44/DannyMassa.jpg";
import FrannieMarin from "@/assets/survivors/S44/FrannieMarin.jpg";
import HeidiLagaresGreenblatt from "@/assets/survivors/S44/HeidiLagaresGreenblatt.jpg";
import HelenLi from "@/assets/survivors/S44/HelenLi.jpg";
import JaimeLynnRuiz from "@/assets/survivors/S44/JaimeLynnRuiz.jpg";
import JoshWilder from "@/assets/survivors/S44/JoshWilder.jpg";
import KaneFritzler from "@/assets/survivors/S44/KaneFritzler.jpg";
import LaurenHarpe from "@/assets/survivors/S44/LaurenHarpe.jpg";
import MaddyPomilla from "@/assets/survivors/S44/MaddyPomilla.jpg";
import MattBlankinship from "@/assets/survivors/S44/MattBlankinship.jpg";
import MatthewGrinsteadMayle from "@/assets/survivors/S44/MatthewGrinsteadMayle.jpg";
import SarahWade from "@/assets/survivors/S44/SarahWade.jpg";
import YamilArocho from "@/assets/survivors/S44/YamilArocho.jpg";
import AndyRueda from "@/assets/survivors/S47/AndyRueda.jpg";
import AnikaDhar from "@/assets/survivors/S47/AnikaDhar.jpg";
import AyshaWelch from "@/assets/survivors/S47/AyshaWelch.jpg";
import CarolineVidmar from "@/assets/survivors/S47/CarolineVidmar.jpg";
import GabeOrtis from "@/assets/survivors/S47/GabeOrtis.jpg";
import GenevieveMushaluk from "@/assets/survivors/S47/GenevieveMushaluk.jpg";
import JonLovett from "@/assets/survivors/S47/JonLovett.jpg";
import KishanPatel from "@/assets/survivors/S47/KishanPatel.jpg";
import KyleOstwald from "@/assets/survivors/S47/KyleOstwald.jpg";
import RachelLaMont from "@/assets/survivors/S47/RachelLaMont.jpg";
import RomeCooney from "@/assets/survivors/S47/RomeCooney.jpg";
import SamPhalen from "@/assets/survivors/S47/SamPhalen.jpg";
import SierraWright from "@/assets/survivors/S47/SierraWright.jpg";
import SolomonYi from "@/assets/survivors/S47/SolomonYi.jpg";
import SueSmey from "@/assets/survivors/S47/SueSmey.jpg";
import TeenyChirichillo from "@/assets/survivors/S47/TeenyChirichillo.jpg";
import TerranFoster from "@/assets/survivors/S47/TerranFoster.jpg";
import TiyanaHallums from "@/assets/survivors/S47/TiyanaHallums.jpg";

export default {
  name: "CastMember",
  props: {
    id: String,
    name: String,
    age: Number,
    hometown: String,
    occupation: String,
    startingTribe: String,
    tribe: String,
    votedOut: Boolean,
  },
  data() {
    return {
      survivorImages: {
        // S42
        ChanelleHowell: ChanelleHowell,
        DanielStrunk: DanielStrunk,
        DreaWheeler: DreaWheeler,
        HaiGiang: HaiGiang,
        JacksonFox: JacksonFox,
        JennyKim: JennyKim,
        JonathanYoung: JonathanYoung,
        LindsayDolashewich: LindsayDolashewich,
        LydiaMeredith: LydiaMeredith,
        MaryanneOketch: MaryanneOketch,
        MaryaSherron: MaryaSherron,
        MikeTurner: MikeTurner,
        OmarZaheer: OmarZaheer,
        RocksroyBailey: RocksroyBailey,
        RomeoEscobar: RomeoEscobar,
        SwatiGoel: SwatiGoel,
        ToriMeehan: ToriMeehan,
        ZachWurtenberger: ZachWurtenberger,
        // S43
        CassidyClark: CassidyClark,
        CodyAssenmacher: CodyAssenmacher,
        DwightMoore: DwightMoore,
        ElieScott: ElieScott,
        GeoBustamante: GeoBustamante,
        JamesJones: JamesJones,
        JeanineZheng: JeanineZheng,
        JesseLopez: JesseLopez,
        JustineBrennan: JustineBrennan,
        KarlaCruzGodoy: KarlaCruzGodoy,
        LindsayCarmine: LindsayCarmine,
        MikeGabler: MikeGabler,
        MorriahYoung: MorriahYoung,
        NnekaEjere: NnekaEjere,
        NoelleLambert: NoelleLambert,
        OwenKnight: OwenKnight,
        RyanMedrano: RyanMedrano,
        SamiLayadi: SamiLayadi,
        // S44
        BrandonCottom: BrandonCottom,
        BrucePerreault: BrucePerreault,
        CarolynWiger: CarolynWiger,
        CarsonGarrett: CarsonGarrett,
        ClaireRafson: ClaireRafson,
        DannyMassa: DannyMassa,
        FrannieMarin: FrannieMarin,
        HeidiLagaresGreenblatt: HeidiLagaresGreenblatt,
        HelenLi: HelenLi,
        JaimeLynnRuiz: JaimeLynnRuiz,
        JoshWilder: JoshWilder,
        KaneFritzler: KaneFritzler,
        LaurenHarpe: LaurenHarpe,
        MaddyPomilla: MaddyPomilla,
        MattBlankinship: MattBlankinship,
        MatthewGrinsteadMayle: MatthewGrinsteadMayle,
        SarahWade: SarahWade,
        YamilArocho: YamilArocho,
        // S47
        AndyRueda: AndyRueda,
        AnikaDhar: AnikaDhar,
        AyshaWelch: AyshaWelch,
        CarolineVidmar: CarolineVidmar,
        GabeOrtis: GabeOrtis,
        GenevieveMushaluk: GenevieveMushaluk,
        JonLovett: JonLovett,
        KishanPatel: KishanPatel,
        KyleOstwald: KyleOstwald,
        RachelLaMont: RachelLaMont,
        RomeCooney: RomeCooney,
        SamPhalen: SamPhalen,
        SierraWright: SierraWright,
        SolomonYi: SolomonYi,
        SueSmey: SueSmey,
        TeenyChirichillo: TeenyChirichillo,
        TerranFoster: TerranFoster,
        TiyanaHallums: TiyanaHallums,
      }
    }
  },
  methods: {
    getImgUrl() {
      return this.survivorImages[this.id];
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/colors.scss";

.cast-member {
  padding: 10px;

  h3, p {
    margin-bottom: 5px;
    margin-top: 0px;
  }

  img {
    box-sizing: border-box;
    width: 100%;
    &.grey {
      filter: grayscale(100%) opacity(50%);
    }
    &.ika {
      border: 3px solid $survivor-ika;
    }
    &.taku {
      border: 3px solid $survivor-taku;
    }
    &.vati {
      border: 3px solid $survivor-vati;
    }
    &.kulakula {
      border: 3px solid $survivor-kulakula;
    }
    &.koka {
      border: 3px solid $survivor-koka;
    }
    &.vesi {
      border: 3px solid $survivor-vesi;
    }
    &.baka {
      border: 3px solid $survivor-baka;
    }
    &.gaia {
      border: 3px solid $survivor-gaia;
    }
    &.ratu {
      border: 3px solid $survivor-ratu;
    }
    &.soka {
      border: 3px solid $survivor-soka;
    }
    &.tika {
      border: 3px solid $survivor-tika;
    }
    &.vava {
      border: 3px solid $survivor-vava;
      border-image: linear-gradient(to left top, $survivor-vava, $survivor-vava-2) 3;
    }
    &.gata {
      border: 3px solid $survivor-gata;
    }
    &.luvo {
      border: 3px solid $survivor-luvo;
    }
    &.tuku {
      border: 3px solid $survivor-tuku;
    }
    &.beka {
      border: 3px solid $survivor-beka;
      border-image: linear-gradient(to left top, $survivor-beka, $survivor-beka-2) 3;
    }
  }
}
</style>