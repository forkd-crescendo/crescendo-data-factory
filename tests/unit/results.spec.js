import splitArray from "@/lib/splitArray";

test("count: 2", () => {
  const result = splitArray({ size: 5, length: 2 });
  expect(result.length).toEqual(2);
  expect(result.reduce((acc, cur) => acc + cur, 0)).toEqual(5);
});

test("count: 3", () => {
  const result = splitArray({ size: 10, length: 3 });
  expect(result.length).toEqual(3);
  expect(result.reduce((acc, cur) => acc + cur, 0)).toEqual(10);
});

test("count: 4", () => {
  const result = splitArray({ size: 20, length: 4 });
  expect(result.length).toEqual(4);
  expect(result.reduce((acc, cur) => acc + cur, 0)).toEqual(20);
});
