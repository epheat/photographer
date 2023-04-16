<template>
  <div class="cast-head-container">
    <img :src="getImgUrl()" :alt="id" :title="id" class="cast-head" :class="{
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
    }"/>
    <div class="cover" v-if="correct || incorrect" :title="id" :class="{
      correct: correct,
      incorrect: incorrect
    }">
      {{ coverText }}
    </div>
  </div>
</template>

<script>
import ChanelleHowellHead from "@/assets/survivors/S42/ChanelleHowell_head.jpg";
import DanielStrunkHead from "@/assets/survivors/S42/DanielStrunk_head.jpg";
import DreaWheelerHead from "@/assets/survivors/S42/DreaWheeler_head.jpg";
import HaiGiangHead from "@/assets/survivors/S42/HaiGiang_head.jpg";
import JacksonFoxHead from "@/assets/survivors/S42/JacksonFox_head.jpg";
import JennyKimHead from "@/assets/survivors/S42/JennyKim_head.jpg";
import JonathanYoungHead from "@/assets/survivors/S42/JonathanYoung_head.jpg";
import LindsayDolashewichHead from "@/assets/survivors/S42/LindsayDolashewich_head.jpg";
import LydiaMeredithHead from "@/assets/survivors/S42/LydiaMeredith_head.jpg";
import MaryanneOketchHead from "@/assets/survivors/S42/MaryanneOketch_head.jpg";
import MaryaSherronHead from "@/assets/survivors/S42/MaryaSherron_head.jpg";
import MikeTurnerHead from "@/assets/survivors/S42/MikeTurner_head.jpg";
import OmarZaheerHead from "@/assets/survivors/S42/OmarZaheer_head.jpg";
import RocksroyBaileyHead from "@/assets/survivors/S42/RocksroyBailey_head.jpg";
import RomeoEscobarHead from "@/assets/survivors/S42/RomeoEscobar_head.jpg";
import SwatiGoelHead from "@/assets/survivors/S42/SwatiGoel_head.jpg";
import ToriMeehanHead from "@/assets/survivors/S42/ToriMeehan_head.jpg";
import ZachWurtenbergerHead from "@/assets/survivors/S42/ZachWurtenberger_head.jpg";
import CassidyClarkHead from "@/assets/survivors/S43/CassidyClarkHead.jpg";
import CodyAssenmacherHead from "@/assets/survivors/S43/CodyAssenmacherHead.jpg";
import DwightMooreHead from "@/assets/survivors/S43/DwightMooreHead.jpg";
import ElieScottHead from "@/assets/survivors/S43/ElieScottHead.jpg";
import GeoBustamanteHead from "@/assets/survivors/S43/GeoBustamanteHead.jpg";
import JamesJonesHead from "@/assets/survivors/S43/JamesJonesHead.jpg";
import JeanineZhengHead from "@/assets/survivors/S43/JeanineZhengHead.jpg";
import JesseLopezHead from "@/assets/survivors/S43/JesseLopezHead.jpg";
import JustineBrennanHead from "@/assets/survivors/S43/JustineBrennanHead.jpg";
import KarlaCruzGodoyHead from "@/assets/survivors/S43/KarlaCruzGodoyHead.jpg";
import LindsayCarmineHead from "@/assets/survivors/S43/LindsayCarmineHead.jpg";
import MikeGablerHead from "@/assets/survivors/S43/MikeGablerHead.jpg";
import MorriahYoungHead from "@/assets/survivors/S43/MorriahYoungHead.jpg";
import NnekaEjereHead from "@/assets/survivors/S43/NnekaEjereHead.jpg";
import NoelleLambertHead from "@/assets/survivors/S43/NoelleLambertHead.jpg";
import OwenKnightHead from "@/assets/survivors/S43/OwenKnightHead.jpg";
import RyanMedranoHead from "@/assets/survivors/S43/RyanMedranoHead.jpg";
import SamiLayadiHead from "@/assets/survivors/S43/SamiLayadiHead.jpg";
import BrandonCottomHead from "@/assets/survivors/S44/BrandonCottomHead.jpg";
import BrucePerreaultHead from "@/assets/survivors/S44/BrucePerreaultHead.jpg";
import CarolynWigerHead from "@/assets/survivors/S44/CarolynWigerHead.jpg";
import CarsonGarrettHead from "@/assets/survivors/S44/CarsonGarrettHead.jpg";
import ClaireRafsonHead from "@/assets/survivors/S44/ClaireRafsonHead.jpg";
import DannyMassaHead from "@/assets/survivors/S44/DannyMassaHead.jpg";
import FrannieMarinHead from "@/assets/survivors/S44/FrannieMarinHead.jpg";
import HeidiLagaresGreenblattHead from "@/assets/survivors/S44/HeidiLagaresGreenblattHead.jpg";
import HelenLiHead from "@/assets/survivors/S44/HelenLiHead.jpg";
import JaimeLynnRuizHead from "@/assets/survivors/S44/JaimeLynnRuizHead.jpg";
import JoshWilderHead from "@/assets/survivors/S44/JoshWilderHead.jpg";
import KaneFritzlerHead from "@/assets/survivors/S44/KaneFritzlerHead.jpg";
import LaurenHarpeHead from "@/assets/survivors/S44/LaurenHarpeHead.jpg";
import MaddyPomillaHead from "@/assets/survivors/S44/MaddyPomillaHead.jpg";
import MattBlankinshipHead from "@/assets/survivors/S44/MattBlankinshipHead.jpg";
import MatthewGrinsteadMayleHead from "@/assets/survivors/S44/MatthewGrinsteadMayleHead.jpg";
import SarahWadeHead from "@/assets/survivors/S44/SarahWadeHead.jpg";
import YamilArochoHead from "@/assets/survivors/S44/YamilArochoHead.jpg";

export default {
  name: "CastHead",
  props: {
    id: String,
    votedOut: Boolean,
    tribe: String,
    correct: Boolean,
    incorrect: Boolean,
  },
  data() {
    return {
      survivorImages: {
        // S42
        ChanelleHowell: ChanelleHowellHead,
        DanielStrunk: DanielStrunkHead,
        DreaWheeler: DreaWheelerHead,
        HaiGiang: HaiGiangHead,
        JacksonFox: JacksonFoxHead,
        JennyKim: JennyKimHead,
        JonathanYoung: JonathanYoungHead,
        LindsayDolashewich: LindsayDolashewichHead,
        LydiaMeredith: LydiaMeredithHead,
        MaryanneOketch: MaryanneOketchHead,
        MaryaSherron: MaryaSherronHead,
        MikeTurner: MikeTurnerHead,
        OmarZaheer: OmarZaheerHead,
        RocksroyBailey: RocksroyBaileyHead,
        RomeoEscobar: RomeoEscobarHead,
        SwatiGoel: SwatiGoelHead,
        ToriMeehan: ToriMeehanHead,
        ZachWurtenberger: ZachWurtenbergerHead,
        // S43
        CassidyClark: CassidyClarkHead,
        CodyAssenmacher: CodyAssenmacherHead,
        DwightMoore: DwightMooreHead,
        ElieScott: ElieScottHead,
        GeoBustamante: GeoBustamanteHead,
        JamesJones: JamesJonesHead,
        JeanineZheng: JeanineZhengHead,
        JesseLopez: JesseLopezHead,
        JustineBrennan: JustineBrennanHead,
        KarlaCruzGodoy: KarlaCruzGodoyHead,
        LindsayCarmine: LindsayCarmineHead,
        MikeGabler: MikeGablerHead,
        MorriahYoung: MorriahYoungHead,
        NnekaEjere: NnekaEjereHead,
        NoelleLambert: NoelleLambertHead,
        OwenKnight: OwenKnightHead,
        RyanMedrano: RyanMedranoHead,
        SamiLayadi: SamiLayadiHead,
        // S44
        BrandonCottom: BrandonCottomHead,
        BrucePerreault: BrucePerreaultHead,
        CarolynWiger: CarolynWigerHead,
        CarsonGarrett: CarsonGarrettHead,
        ClaireRafson: ClaireRafsonHead,
        DannyMassa: DannyMassaHead,
        FrannieMarin: FrannieMarinHead,
        HeidiLagaresGreenblatt: HeidiLagaresGreenblattHead,
        HelenLi: HelenLiHead,
        JaimeLynnRuiz: JaimeLynnRuizHead,
        JoshWilder: JoshWilderHead,
        KaneFritzler: KaneFritzlerHead,
        LaurenHarpe: LaurenHarpeHead,
        MaddyPomilla: MaddyPomillaHead,
        MattBlankinship: MattBlankinshipHead,
        MatthewGrinsteadMayle: MatthewGrinsteadMayleHead,
        SarahWade: SarahWadeHead,
        YamilArocho: YamilArochoHead,
      }
    }
  },
  computed: {
    coverText() {
      if (this.correct) {
        return "✅";
      } else if (this.incorrect) {
        return "❌";
      } else {
        return "";
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
.cast-head-container {
  position: relative;
  display: inline-block;
}

img {
  object-fit: cover;
  width: 100%;
  box-sizing: border-box;

  &.grey {
    filter: grayscale(100%);
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
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 5px;
  opacity: 0.5;

  &.correct {
    background-color: $ps-green;
  }
  &.incorrect {
    background-color: $ps-red;
  }
}

</style>