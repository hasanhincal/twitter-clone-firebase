/*
 >> Herhangi bir medya içeriğini ( foto, video, ses, dosya , belge vb.)
veri tabanına doğrudan kaydetmeyiz. Bu soruna çözüm olarak medya 
içeriklerini sadece medya verisi depolaması için tasarlanmıs olan 
yapılarda depolayıp medyaya erişmek için kullanılan url adreslerini
veritabanında saklarız.
*/

// bu yükleme resim ve diğerleri içinde aynı fakat bu projede resim ekrana basıcaz çünkü zaman alacağı ve veri sinirinı aşmamak için...

// >> Bu fonksiyondan beklentimiz dosyayı alıp firebase storage'a yükleyip ardından "url" 'ini return etmesi.
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";

const upLoad = async (file) => {
  // 1- Dosya resim değilse veya dosya yoksa fonk. durdur;
  if (!file?.type.startsWith("image") || !file) {
    return null;
  }
  // 2- Dosyanın yükleneceği konumun referansını al;
  const imageRef = ref(storage, v4() + file.name);

  // 3- Referansını oluşturduğumuz konumda dosyayı yükle;
  await uploadBytes(imageRef, file);

  // 4- Yüklenen dosyanın url'ini al ve return et;
  return await getDownloadURL(imageRef);
};

export default upLoad;
