// 生成数独解决方案
import Toolkit from './toolkit';

export class Generator {
  matrix: number[][];
  orders: number[][];

  generate() {
    while (!this.internalGenerate()) {
      console.log("try again")
    }
  }

  internalGenerate() {
    this.matrix = Toolkit.matrix.makeMatrix();
    this.orders = Toolkit.matrix.makeMatrix()
        .map(row => row.map((v, i) => i))
        .map(row => Toolkit.matrix.shuffle(row));

    // Toolkit.matrix.makeRow

    for(let n = 1; n <= 9; n++){
      if (!this.fillNumber(n)){
        return false;
      }
    }
    return true
  }

  fillNumber(n: number){
    return this.fillRow(n, 0);
  }

  private fillRow(n: number, rowIndex: number) {
    if (rowIndex > 8){
      return true;
    }

    const row = this.matrix[rowIndex];
    const orders = this.orders[rowIndex];
    // TODO 随机选择列
    for (let i = 0; i < 9; i++){
      const colIndex = orders[i];

      // 这个位置已经有值，跳过
      if(row[colIndex]) {
        continue;
      }

      // 检查这个位置是否可以填 n
      if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
        continue;
      }

      // 去下一行填写 n，如果没填进去，就继续寻找当前行下一个位置
      row[colIndex] = n;
      // // 当前行填写 n 成功， 递归调用 fillRow 来在下一行中填写 n
      // this.fillRow(n, rowIndex + 1);
      if(!this.fillRow(n, rowIndex + 1)){
        row[colIndex] = 0;
        continue;
      }

      return true;
    }

    return false;
  }
}

export default Generator;