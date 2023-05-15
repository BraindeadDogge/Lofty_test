const memoize = (fn, delay) => {
  let cache = null;
  let cacheTime = null;

  return async function () {
    const now = Date.now();
    if (cache && now - cacheTime < delay) {
      return cache;
    }
    const result = await fn();
    cache = result;
    cacheTime = now;
    return result;
  };
};

let count = 0;
const getData = () => Promise.resolve(++count);
const sleep = (n) => new Promise((resolve) => setTimeout(resolve, n * 1000));

const getJsonMemoize = memoize(getData, 1000);

(async () => {
  console.log(await getJsonMemoize()); // 1
  console.log(await getJsonMemoize()); // 1
  await sleep(3);
  console.log(await getJsonMemoize()); // 2
})();
