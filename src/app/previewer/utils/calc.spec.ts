import * as _ from './calc';

describe('image util', () => {
  test('geometricScaling 等比缩放', () => {
    expect(_.geometricScaling(400, 400, 500, 500)).toEqual([400, 400]);
    expect(_.geometricScaling(1000, 400, 500, 500)).toEqual([500, 200]);
    expect(_.geometricScaling(400, 1000, 500, 500)).toEqual([200, 500]);
  });

  test('alignCenter 获取矫正后的绘图起始坐标', () => {
    expect(_.alignCenter(200, 500, 500, 500)).toEqual([150, 0]);
    expect(_.alignCenter(500, 200, 500, 500)).toEqual([0, 150]);
    expect(_.alignCenter(200, 200, 500, 500)).toEqual([150, 150]);
  });
});
