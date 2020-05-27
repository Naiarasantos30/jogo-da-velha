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
        } else if (computer === 2) {
          alert("Você Venceu!!!")
          break
        } else if (
          game[`${line}${column}`] === "X" &&
          game[`${line}${column + 1}`] === "X" &&
          game[`${line}${column + 2}`] === "X"
        ) {
          player++
        } else if (
          game[`${line}${column}`] === "O" &&
          game[`${line}${column + 1}`] === "O" &&
          game[`${line}${column + 2}`] === "O"
        ) {
          computer++
        } else if (
          game[`${line}${column}`] === "X" &&
          game[`${line + 1}${column}`] === "X" &&
          game[`${line + 2}${column}`] === "X"
        ) {
          player++
        } else if (
          game[`${line}${column}`] === "O" &&
          game[`${line + 1}${column}`] === "O" &&
          game[`${line + 2}${column}`] === "O"
        ) {
          player++
        }
      }
    }
  }

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
