const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const mockData = () => {
  return {
    notification: "Notificacion",
    dataNotification: "About",
  };
};

export default function makeData(howmany: number) {
  return range(howmany).map(() => {
    return {
      ...mockData(),
    };
  });
}
