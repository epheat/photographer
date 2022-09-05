<template>
  <img :src="getImgUrl()" :alt="id" :title="id" class="cast-head" :class="{
    grey: votedOut,
    ika: tribe === 'Ika',
    vati: tribe === 'Vati',
    taku: tribe === 'Taku',
    kulakula: tribe === 'Kula Kula',
    koka: tribe === 'Koka',
    vesi: tribe === 'Vesi',
    baka: tribe === 'Baka',
  }"/>
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

export default {
  name: "CastHead",
  props: {
    id: String,
    votedOut: Boolean,
    tribe: String,
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

img {
  object-fit: cover;

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
}
</style>