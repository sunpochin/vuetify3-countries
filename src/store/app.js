import { defineStore } from "pinia";

// export const useAppStore = defineStore("app", {
//   // 對應 data
//   state: () => ({
//     name: "Jenny",
//     wallet: "300",
//     countryData: [],
//   }),
// });

export const useCounterStore = defineStore("counter", {
  //定義狀態初始值
  state: () => ({
    allCountryData: [""],
    filteredCountryData: [""],
  }),
  //對狀態加工的 getters，如同 computed
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  //定義使用到的函式，可以為同步和非同步，如同 method
  actions: {
    increment() {
      this.count++;
    },
  },
});
