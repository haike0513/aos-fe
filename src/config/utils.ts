export const delayData = <T>(data: T, time = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, time);
  })
}