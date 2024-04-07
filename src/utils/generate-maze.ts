export const generateMaze = (mazeData: number[][][]) => {
  const mazeBody = document.querySelector('#maze > tbody');

  for (let i = 0; i < mazeData.length; i++) {
    const tr = document.createElement('tr');
    mazeBody?.append(tr);

    for (let j = 0; j < mazeData[i].length; j++) {
      const selector = i + '-' + j;
      const td = document.createElement('td');
      td.id = selector;
      td.innerHTML = '&nbsp;';
      mazeBody?.append(td);

      if (mazeData[i][j][0] === 0) {
        document.getElementById(selector)?.style.setProperty('border-top', '2px solid black');
      }
      if (mazeData[i][j][1] === 0) {
        document.getElementById(selector)?.style.setProperty('border-right', '2px solid black');
      }
      if (mazeData[i][j][2] === 0) {
        document.getElementById(selector)?.style.setProperty('border-bottom', '2px solid black');
      }
      if (mazeData[i][j][3] === 0) {
        document.getElementById(selector)?.style.setProperty('border-left', '2px solid black');
      }
    }
  }
};
