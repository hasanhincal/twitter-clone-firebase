import React, { useEffect, useState } from "react";
import TweetForm from "../../components/TweetForm";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "../../components/Post";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);
  // kolleksiyonun referansını alma;
  const tweetsCol = collection(db, "tweets");

  useEffect(() => {
    // filtreleme ayarlarını tanımlama;
    const queryOptions = query(tweetsCol, orderBy("createdAt", "desc"));

    // koleksiyondaki değişimi izleme;
    onSnapshot(queryOptions, (snapshot) => {
      // tweetleri geçici olarak tuttuğumuz dizi;
      const tempTweets = [];

      // dökümanların verilerine erişip diziye aktarma;
      snapshot.forEach((doc) => tempTweets.push({ ...doc.data(), id: doc.id }));

      setTweets(tempTweets);
    });
  }, []);

  return (
    <main className="border border-zinc-800 overflow-auto">
      <header className="p-4 font-bold border border-zinc-800">Anasayfa</header>
      <TweetForm />
      {/* loading */}
      {!tweets && <p className="text-center mt-52">Yükleniyor...</p>}
      {/* atılan tweetlerin listelendiği alan */}
      <div>
        {tweets?.map((tweet) => (
          <Post key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </main>
  );
};

export default Main;
