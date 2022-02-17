<template>
  <div class="cast-member">
    <img :alt="name" :src="getImgUrl()"/>
    <h3>{{ name }}</h3>
    <p>Age: {{ age }}</p>
    <p>From: {{ hometown }}</p>
    <p>Occupation: {{ occupation }}</p>
  </div>
</template>

<script>
import ChanelleHowell from "@/assets/survivors/ChanelleHowell.jpg";
import DanielStrunk from "@/assets/survivors/DanielStrunk.jpg";
import DreaWheeler from "@/assets/survivors/DreaWheeler.jpg";
import HaiGiang from "@/assets/survivors/HaiGiang.jpg";
import JacksonFox from "@/assets/survivors/JacksonFox.jpg";
import JennyKim from "@/assets/survivors/JennyKim.jpg";
import JonathanYoung from "@/assets/survivors/JonathanYoung.jpg";
import LindsayDolashewich from "@/assets/survivors/LindsayDolashewich.jpg";
import LydiaMeredith from "@/assets/survivors/LydiaMeredith.jpg";
import MaryanneOketch from "@/assets/survivors/MaryanneOketch.jpg";
import MaryaSherron from "@/assets/survivors/MaryaSherron.jpg";
import MikeTurner from "@/assets/survivors/MikeTurner.jpg";
import OmarZaheer from "@/assets/survivors/OmarZaheer.jpg";
import RocksroyBailey from "@/assets/survivors/RocksroyBailey.jpg";
import RomeoEscobar from "@/assets/survivors/RomeoEscobar.jpg";
import SwatiGoel from "@/assets/survivors/SwatiGoel.jpg";
import ToriMeehan from "@/assets/survivors/ToriMeehan.jpg";
import ZachWurtenberger from "@/assets/survivors/ZachWurtenberger.jpg";

export default {
  name: "CastMember",
  props: {
    name: String,
    age: Number,
    hometown: String,
    occupation: String,
  },
  data() {
    return {
      survivorImages: {
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
      }
    }
  },
  methods: {
    getImgUrl() {
      return this.survivorImages[this.name.replaceAll(" ", "")];
    }
  }
}
</script>

<style lang="scss" scoped>
.cast-member {
  padding: 10px;

  h3, p {
    margin-bottom: 5px;
    margin-top: 0px;
  }

  img {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>