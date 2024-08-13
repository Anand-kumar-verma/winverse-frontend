const array_for_image = [
  {
    index: 0,
    alphabet: "0",
  },
  {
    index: 1,
    alphabet: "1",
  },
  {
    index: 2,
    alphabet: "2",
  },
  {
    index: 3,
    alphabet: "3",
  },
  {
    index: 4,
    alphabet: "4",
  },
  {
    index: 5,
    alphabet: "5",
  },
  {
    index: 6,
    alphabet: "6",
  },
  {
    index: 7,
    alphabet: "7",
  },
  {
    index: 8,
    alphabet: "8",
  },
  {
    index: 9,
    alphabet: "9",
  },
  {
    index: 10,
    alphabet: "A",
  },
  {
    index: 11,
    alphabet: "B",
  },
  {
    index: 12,
    alphabet: "C",
  },
  {
    index: 13,
    alphabet: "D",
  },
  {
    index: 14,
    alphabet: "E",
  },
  {
    index: 15,
    alphabet: "F",
  },
  {
    index: 16,
    alphabet: "G",
  },
  {
    index: 17,
    alphabet: "H",
  },
  {
    index: 18,
    alphabet: "I",
  },
  {
    index: 19,
    alphabet: "J",
  },
  {
    index: 20,
    alphabet: "K",
  },
  {
    index: 21,
    alphabet: "L",
  },
  {
    index: 22,
    alphabet: "M",
  },
  {
    index: 23,
    alphabet: "N",
  },
  {
    index: 24,
    alphabet: "O",
  },
  {
    index: 25,
    alphabet: "P",
  },
  {
    index: 26,
    alphabet: "Q",
  },
  {
    index: 27,
    alphabet: "R",
  },
  {
    index: 28,
    alphabet: "S",
  },
  {
    index: 29,
    alphabet: "T",
  },
  {
    index: 30,
    alphabet: "U",
  },
  {
    index: 31,
    alphabet: "V",
  },
  {
    index: 32,
    alphabet: "W",
  },
  {
    index: 33,
    alphabet: "X",
  },
  {
    index: 34,
    alphabet: "Y",
  },
  {
    index: 35,
    alphabet: "Z",
  },
];

export const changeImages = () => {
    const currentTime = Date.now();
    const currentHours = new Date(currentTime).getHours();
    if (currentHours >= 0 && currentHours < 6) {
      return `0_1_2_3_4`;
    } else if (currentHours >= 6 && currentHours < 12) {
      return `4_5_6_7_8`;
    } else if (currentHours >= 12 && currentHours < 18) {
      return `8_9_0_1_2`;
    } else {
      return `3_4_5_6_7`;
    }
  };

  export const changeImagesTRX = (trx_game_image_index) => {
    const result =trx_game_image_index || ["1", "1", "1", "B", "5"];
    const index_value = [];
    result?.forEach((value) => {
      index_value.push(array_for_image?.find((j) => j.alphabet === value)?.index);
    });
    return index_value;
  };
  