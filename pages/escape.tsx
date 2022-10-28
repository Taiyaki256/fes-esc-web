import { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import styles from "styles/esc.module.scss";
import Layout from 'components/layout/Layout'
import io from "socket.io-client";
import type { sync } from "../lib/socket";
import { useRouter } from "next/router";
import { wsURL } from "../lib/socket";

const socket = io(wsURL + "q");


const Escape = () => {
  const [pages, setPages] = useState(0);
  const [text, setText] = useState("");
  // -1 if faile, 0 is nomal, 1 is sussceeful
  const [onStatus, setStatus] = useState(0)

  var router = useRouter();
  var id = router.query["id"];
  console.log(id);

  const sync = ({ page, text, status }: sync) => {
    const data: sync = {
      socketId: socket.id,

      page: page,
      text: text,
      status: status,
    }

    console.log(data);
    socket.emit("sync", data);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      socket.emit("join", id);
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("sync", (data: sync) => {
      console.log(data);

      if (data.socketId == socket.id) {
        return
      }

      setPages(data.page!);
      setText(data.text!);
      setStatus(data.status!);
    })

  }, [id]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    let io_text = "";
    const TMP_text = (n: string) => {
      setText(n);
      io_text = n;
    }
    if (onStatus == 1 || onStatus == -1) {
      TMP_text(e.target.value.slice(-1).toUpperCase());
      setStatus(0);
    }
    else {
      TMP_text(e.target.value.toUpperCase());
      console.log(e.target.value);
    }
    sync({ socketId: socket.id, page: undefined, text: io_text, status: 0 });
  };

  const check = () => {
    console.log("a");
    console.log("pages: " + pages);
    console.log("text: " + text);

    let io_status: number = 0;
    let io_page: number = pages;


    // for socket
    const TMP_status = (n: number) => {
      setStatus(n);
      io_status = n;
    }
    const TMP_page = (n: number) => {
      setPages(n);
      io_page = n;
    }


    // normal logic
    TMP_status(-1)
    if (text == "43" && pages == 0) {
      TMP_page(1);
      TMP_status(1)
    }
    if (text == "13" && pages == 1) {
      TMP_page(2);
      TMP_status(1)

    }
    if (text == "POOL" || text == "ぷーる" || text == "プール" && pages == 2) {
      TMP_page(3);
      TMP_status(1)

    }
    if (text == "12" && pages == 3) {
      TMP_page(4);
      TMP_status(1)
    }
    setText("");
    console.log(text);
    sync({ socketId: socket.id, page: io_page, text: "", status: io_status });

  }


  const questionList: string[] = [
    "T=1 D=1 F=2 K=?",
    "教卓の中",
    "WD=木,RM=部屋,DR=人形,PL=?",
    "0,1,1,2,3,5,X,13,21,34,55…の時 X=?<br> 1,Y,27,64,125,216…の時 Y=?<br>3.1,Z,1,5,9,2,6,5…の時 Z=?<br>X+Y-Z=A Aを答えよ",
    "暗証番号 4612"
  ]

  const onclick = (key: number) => {
    let io_status: number = 0
    let io_text: string = ""
    const TMP_status = (n: number) => {
      setStatus(n);
      io_status = n;
    }
    const TMP_text = (n: string) => {
      setText(n);
      io_text = n;
    }
    if (onStatus) { TMP_status(0) }
    switch (key) {
      case 9:
        TMP_text(text.slice(0, -1));
        break;
      case 10:
        TMP_text(text + "0")
        break;
      case 11:
        check()
        return;
      default:
        const tmp = key + 1;
        TMP_text(text + tmp.toString())
        break;
    }

    console.log(text);
    sync({ socketId: socket.id, page: undefined, text: io_text, status: 0 });
  }

  const txvalue = () => {
    if (onStatus == 1) {
      return "Sussceeful"
    }
    if (onStatus == -1) {
      return "Failed"
    }
    return text
  }

  const txclass = () => {
    if (onStatus == 1) {
      return "w-full h-12 border border-gray-800 bg-inherit my-1.5 font-black text-2xl text-cyan-400"
    }
    if (onStatus == -1) {
      return "w-full h-12 border border-gray-800 bg-inherit my-1.5 font-black text-2xl text-rose-900"
    }
    return "w-full h-12 border border-gray-800 bg-inherit my-1.5 font-semibold text-2xl"
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
            ? < input type="text" value={txvalue()} onChange={(e) => onInput(e)} className={txclass()} />
            : < input type="text" value={txvalue()} className={txclass()} readOnly />
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
          {pages == 4 ? (
            <>
              <Image src="/locker.svg" alt="locker image" width={526} height={526} className="w-1/2 h-1/2" />
            </>
          ) : (
            <></>
          )}
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