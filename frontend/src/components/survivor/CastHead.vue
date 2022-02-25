<template>
  <img :src="getImgUrl()" :alt="id" :class="{
    grey: votedOut,
    ika: tribe === 'Ika',
    vati: tribe === 'Vati',
    taku: tribe === 'Taku',
  }"/>
</template>

<script>
import ChanelleHowellHead from "@/assets/survivors/ChanelleHowell_head.jpg";
import DanielStrunkHead from "@/assets/survivors/DanielStrunk_head.jpg";
import DreaWheelerHead from "@/assets/survivors/DreaWheeler_head.jpg";
import HaiGiangHead from "@/assets/survivors/HaiGiang_head.jpg";
import JacksonFoxHead from "@/assets/survivors/JacksonFox_head.jpg";
import JennyKimHead from "@/assets/survivors/JennyKim_head.jpg";
import JonathanYoungHead from "@/assets/survivors/JonathanYoung_head.jpg";
import LindsayDolashewichHead from "@/assets/survivors/LindsayDolashewich_head.jpg";
import LydiaMeredithHead from "@/assets/survivors/LydiaMeredith_head.jpg";
import MaryanneOketchHead from "@/assets/survivors/MaryanneOketch_head.jpg";
import MaryaSherronHead from "@/assets/survivors/MaryaSherron_head.jpg";
import MikeTurnerHead from "@/assets/survivors/MikeTurner_head.jpg";
import OmarZaheerHead from "@/assets/survivors/OmarZaheer_head.jpg";
import RocksroyBaileyHead from "@/assets/survivors/RocksroyBailey_head.jpg";
import RomeoEscobarHead from "@/assets/survivors/RomeoEscobar_head.jpg";
import SwatiGoelHead from "@/assets/survivors/SwatiGoel_head.jpg";
import ToriMeehanHead from "@/assets/survivors/ToriMeehan_head.jpg";
import ZachWurtenbergerHead from "@/assets/survivors/ZachWurtenberger_head.jpg";

export default {
  name: "CastHead",
  props: {
    id: String,
    votedOut: String,
    tribe: String,
  },
  data() {
    return {
      survivorImages: {
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
}
</style>