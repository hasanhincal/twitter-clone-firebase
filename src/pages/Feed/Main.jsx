import React, { useEffect, useState } from "react";
import TweetForm from "../../components/Form";
import { db } from "../../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Post from "../../components/Post";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  useEffect(() => {
    // Abone olunacak kolleksiyonun referansını alma;
    const tweetsCol = collection(db, "tweets");

    // filtreleme ayarlarını tanımlama;
    const queryOptions = query(tweetsCol, orderBy("createdAt", "desc"));

    // koleksiyondaki değişimi anlık izleme(kolleksiyona abone olma);
    const unsub = onSnapshot(queryOptions, (snapshot) => {
      // tweetleri geçici olarak tuttuğumuz dizi;
      const tempTweets = [];

      // dökümanların verilerine erişip diziye aktarma;
      snapshot.forEach((doc) => tempTweets.push({ ...doc.data(), id: doc.id }));

      setTweets(tempTweets);
    });
    // Bileşen ekrandan giderse aboneliği durdurur.
    return () => unsub();
  }, []);

  return (
    <main className="border border-zinc-600 overflow-y-auto">
      <header className="p-4 font-bold border-b border-zinc-600">
        Anasayfa
      </header>
      <TweetForm user={user} />
      {/* loading */}
      {!tweets && (
        <div className="flex justify-center mt-48 scale-[2]">
          <Loader />
        </div>
      )}
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
