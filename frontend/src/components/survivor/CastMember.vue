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
  }
}
</style>