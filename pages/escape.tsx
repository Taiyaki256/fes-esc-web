import { ReactElement, SetStateAction, useState } from "react";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'

const Escape = () => {
  const [pages, setPages] = useState(0);
  const [text, setText] = useState("");

  const timer = () => {
    return (
      <div className={styles.timer}>
        <div className={styles.wrapper}>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.minutes} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.minutes} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.seconds} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.seconds} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
          <div className={styles.timepartwrapper}>
            <div className={`${styles.timepart} ${styles.hundredths} ${styles.tens}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
            <div className={`${styles.timepart} ${styles.hundredths} ${styles.ones}`}>
              <div className={styles.digitwrapper}>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>9</span>
                <span className={styles.digit}>8</span>
                <span className={styles.digit}>7</span>
                <span className={styles.digit}>6</span>
                <span className={styles.digit}>5</span>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>3</span>
                <span className={styles.digit}>2</span>
                <span className={styles.digit}>1</span>
                <span className={styles.digit}>0</span>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
  const textArea = () => {
    return (
      <div className={styles.textBox}>
        <textarea rows={1} className={styles.textBox0} value={text} onChange={changeText}></textarea>
      </div>
    )
  }
  const ansBtn = () => {
    return (
      <div className={styles.answerButton}>
        <button className={styles.ansBtn} onClick={() => onClick()}>OK</button>
      </div>
    )
  }
  const onClick = () => {
    console.log("a");
    console.log("pages: " + pages);
    console.log("text: " + text);
    if (text == "43" && pages == 0) {
      setPages(1);
    }
    if (text == "13" && pages == 1) {
      setPages(2);
    }
    if (text == "POOL" && pages == 2) {
      setPages(3);
    }
    if (text == "12" && pages == 3) {
      setPages(4);
    }
    setText("");
  }
  const changeText = (e: { target: { value: SetStateAction<string>; }; }) => {
    setText(e.target.value);
  };

  const questionList: string[] = [
    "T=1 D=1 F=2 K=?",
    "場所 教卓のしたとか",
    "WD=木,RM=部屋,DR=人形,PL=?",
    "0, 1, 1, 2, 3, 5, V, 13, 21, 34, 55…の時 X =? <br> 1, W, 27, 64, 125, 216…の時 Y =? <br> 3.1, X, 1, 5, 9, 2, 6, 5…の時 Z =? <br> X + Y - Z=A <br> A を答えよ",
    "暗証番号 4614"
  ]


  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          {timer()}
        </div>
        <div className={styles.question}>
          <p className={styles.mono} dangerouslySetInnerHTML={{ __html: questionList[pages] }}></p>
        </div>
        {textArea()}
        <div className={styles.mainBottom}>
          {ansBtn()}
        </div>
      </div>
    </>
  )

}

Escape.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Layout" noshow back url="/">
      {page}
    </Layout>
  )
}

export default Escape;