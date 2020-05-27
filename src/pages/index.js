import React, { useState } from "react"
import "../components/style.css"

const IndexPage = () => {
  const [boardLine, setBoardLine] = useState(0)
  const [boardColumn, setBoardColumn] = useState(0)
  const [board, setBoard] = useState()
  const [game, setGame] = useState([])
  const [counterPlayer, setCounterPlayer] = useState(0)
  const [counterComputer, setCounterComputer] = useState(0)

  const createTable = (boardLine, boardColumn) => {
    const boardObj = {}

    for (let line = 1; line <= boardLine; line++) {
      for (let column = 1; column <= boardColumn; column++) {
        const lineColumnString = `${line}${column}`
        boardObj[lineColumnString] = lineColumnString
      }
    }

    setBoard(boardObj)
    return boardObj
  }

  const getBoardKeys = board => {
    const keys = Object.keys(board)

    return keys.map(key => {
      return (
        <div
          id={key}
          className="casa"
          key={key}
          onClick={() => play(key)}
        ></div>
      )
    })
  }

  const computerPlay = () => {
    let jogar = 0
    let l, c
    let positionComputer = ""
    do {
      l = Math.round(Math.random() * (boardLine - 1)) + 1
      c = Math.round(Math.random() * (boardColumn - 1)) + 1
      positionComputer = `${l}${c}`
      const element = document.getElementById(positionComputer)
      if (element.innerText === "" && element.innerText !== "X") {
        element.innerText = "0"
        jogar = 1
      }
    } while (game[positionComputer] != "" && jogar === 0)

    return positionComputer
  }

  const play = (position, player) => {
    const element = document.getElementById(position)

    if (element.innerText === "") {
      element.innerText = "X"
    }

    const positionComputer = computerPlay()
    const newObjPLayer = { ...game, [position]: "X", [positionComputer]: "O" }
    console.log({ newObjPLayer })
    setGame(newObjPLayer)
  }

  const checkTable = function () {
    let player = 0
    let computer = 0

    for (let line = 1; line <= boardLine; line++) {
      for (let column = 1; column <= boardColumn; column++) {
        console.log({ player, computer })
        if (player === 2) {
          alert("Você Venceu!!!")
          break
        }
        if (computer === 2) {
          alert("Você Venceu!!!")
          break
        }
        if (
          game[`${line}${column}`] === "X" &&
          game[`${line}${column + 1}`] === "X" &&
          game[`${line}${column + 2}`] === "X"
        ) {
          player++
        }
        if (
          game[`${line}${column}`] === "O" &&
          game[`${line}${column + 1}`] === "O" &&
          game[`${line}${column + 2}`] === "O"
        ) {
          computer++
        }
      }
    }
  }

  /*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas colunas do Casas, procurando um vencedor*/
  // const allElementsInSomeColumn = function() {
  //     for( var i = 0; i < 3; i++) {
  // if (Casas[i] === "X" && Casas[i + 3] === "X" && Casas[i + 24] === "X") {
  //   alert(JogadorOne.nome + " Venceu!!!")
  //   reset()
  // }
  // if (Casas[i] === "O" && Casas[i + 3] === "O" && Casas[i + 24] === "O") {
  //   alert(JogadorTwo.nome + " Venceu!!!")
  //   reset()
  // }
  //     }

  // }

  /*Verifica a existência de ocorrências de um mesmo elemento(X ou O) nas diagonais do Casas, procurando um vencedor*/
  // const allElementsInSomeDiagonal = function() {
  //     if ( (Casas[0] === 'X' && Casas[4] === 'X' && Casas[8] === 'X') ||
  //          (Casas[2] === 'X' && Casas[4] === 'X' && Casas[6] === 'X')) {
  //             alert (JogadorOne.nome + ' Venceu!!!');
  //         reset();
  //     } else if ( (Casas[0] === 'O' && Casas[4] === 'O' && Casas[8] === 'O') ||
  //                 (Casas[2] === 'O' && Casas[4] === 'O' && Casas[6] === 'O') ) {
  //             alert (JogadorTwo.nome + ' Venceu!!!');
  //         reset();
  //     }
  // }

  checkTable()

  return (
    <div className="page">
      <h1 className="title">Jogo da Velha</h1>

      <label className="label">Selecione forma do tabuleiro:</label>
      <select
        onChange={value => {
          const board = value.target.value
          const [a, b] = board.split("")
          setBoardLine(a)
          setBoardColumn(b)
          const boardObj = createTable(a, b)
          setGame(boardObj)
        }}
      >
        <option value="46"></option>
        <option value="46">Tabuleiro 4x6</option>
        <option value="55">Tabuleiro 5x5</option>
        <option value="64">Tabuleiro 6x4</option>
      </select>

      <div
        className="tabuleiro"
        style={{
          height: `calc(52px * ${boardLine})`,
          width: `calc(52px * ${boardColumn})`,
        }}
      >
        {board && Object.keys(board).length > 0 && getBoardKeys(board)}
      </div>
    </div>
  )
}

export default IndexPage
