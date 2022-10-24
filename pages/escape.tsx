import { ReactElement, SetStateAction, useState } from "react";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'

const Escape = () => {
  const [pages, setPages] = useState(0);
  const [text, setText] = useState("");
  // -1 if faile, 0 is nomal, 1 is sussceeful
  const [onStatus, setStatus] = useState(0)

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(e.target.value);
  };

  const check = () => {
    console.log("a");
    console.log("pages: " + pages);
    console.log("text: " + text);
    setStatus(-1)

    if (text == "43" && pages == 0) {
      setPages(1);
      setStatus(1)
    }
    if (text == "13" && pages == 1) {
      setPages(2);
      setStatus(1)

    }
    if (text == "POOL" && pages == 2) {
      setPages(3);
      setStatus(1)

    }
    if (text == "12" && pages == 3) {
      setPages(4);
      setStatus(1)

    }
    setText("");

  }


  const questionList: string[] = [
    "T=1 D=1 F=2 K=?",
    "場所 教卓のしたとか",
    "WD=木,RM=部屋,DR=人形,PL=?",
    "0, 1, 1, 2, 3, 5, V, 13, 21, 34, 55…の時 X =? <br> 1, W, 27, 64, 125, 216…の時 Y =? <br> 3.1, X, 1, 5, 9, 2, 6, 5…の時 Z =? <br> X + Y - Z=A <br> A を答えよ",
    "暗証番号 4614"
  ]
  const onclick = (key: number) => {
    if (onStatus) { setStatus(0) }
    switch (key) {
      case 9:
        setText(text.slice(0, -1));
        break;
      case 10:
        setText(text + "0")
        break;
      case 11:
        check()
        break;
      default:
        const a: number = key + 1
        setText(text + a.toString())
        break;
    }

  }
  const area = () => {
    const keyboard = () => {
      const items: any[] = []
      for (let i = 0; i < 12; i++) {

        // WTF !?!?!?!
        let k: string | number;
        switch (i) {
          case 9:
            k = "back"
            break;
          case 10:
            k = 0
            break;
          case 11:
            k = "next"
            break;
          default:
            k = i + 1;
            break;
        }

        items.push(
          <>
            <div id={i.toString()} onClick={() => onclick(i)} className="flex justify-center items-center text-lg border border-gray-800 h-12">{k}</div>
          </>
        )

      }
      return (items)
    }
    return (
      <>
        {/* for title */}
        <div className={pages == 4 ? ("hidden") : ("text-orange-600 font-black text-lg")}>Enter Code</div>
        {/* for text area */}
        <div className={pages == 4 ? ("hidden") : ("")}>
          {pages == 2
            ? < input type="text" value={text} onChange={(e) => onInput(e)} className="w-full h-12 border border-gray-800 bg-inherit my-1.5 font-semibold text-2xl" />
            : < input type="text" value={text} className="w-full h-12 border border-gray-800 bg-inherit my-1.5 font-semibold text-2xl" readOnly />
          }
        </div>
        {/* for keyboard */}
        <div className={pages == 2 || pages == 4
          ? "hidden"
          : "grid grid-cols-3 gap-1"}>
          {keyboard()}
        </div>
        {/* for tip */}
        <div className="text-red-600 font-black text-lg text-center">{pages == 2
          ? "Open keyboard"
          : ""}</div>
        {/* for answer */}
        {
          pages == 2
            ? <div id="11" onClick={() => onclick(11)} className="ml-auto right-0 w-12 text-center p-auto text-lg border border-gray-800 h-12 p-1 font-bold">Next</div>
            : ""
        }
      </>
    )
  }


  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainTop}>
        </div>
        <div className={styles.question}>
          <p className={styles.mono} dangerouslySetInnerHTML={{ __html: questionList[pages] }}></p>
        </div>
        {area()}
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