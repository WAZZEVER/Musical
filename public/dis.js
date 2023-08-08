const firebaseConfig = {
  apiKey: "AIzaSyDbCzXFmL3Hyex2uzwiYRaWNvPCWJLudDU",
  authDomain: "testwazz-460a6.firebaseapp.com",
  databaseURL: "https://testwazz-460a6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testwazz-460a6",
  storageBucket: "testwazz-460a6.appspot.com",
  messagingSenderId: "226425030359",
  appId: "1:226425030359:web:bd6e43aa5b15c91dab9292",
  measurementId: "G-9E2CKM9ETJ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var disin = false;
var ididscordid;

window.onload = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  console.log(fragment.toString());
  const accessToken = fragment.get('access_token');
  console.log(`access_token=${accessToken}`);
  const tokenType = fragment.get('token_type');
  console.log(`token_type=${tokenType}`);

  if (accessToken && tokenType) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('tokenType', tokenType);
    fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        const { username, discriminator, id, avatar } = data;
        const imagesrc = `https://cdn.discordapp.com/avatars/${id}/${avatar}`
        document.getElementById('avatar').src = imagesrc;


        
        
        document.getElementById('avatar').classList.add('circular-avatar');

        document.getElementById('name').innerText = `${username}`;
        disin = true;
        ididscordid = `${id}`

        var userRef = db.collection('music').doc(ididscordid);
        userRef.get().then(function(doc) {
          if (doc.exists) {
            const data = doc.data();
            const musictime = data.musictime;

            document.getElementById('musictime').innerHTML = `Music Listened: ${musictime}`;


          } else {

            db.collection('music').doc(ididscordid).set({
              name: `${username}`
            }, { merge: true })

          }
        })
      })

    document.getElementById('logoutdis').style.display = 'inline';
  } else {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedTokenType = localStorage.getItem('tokenType');

    if (storedAccessToken && storedTokenType) {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${storedTokenType} ${storedAccessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          const { username, discriminator, id, avatar } = data;
          const imagesrc = `https://cdn.discordapp.com/avatars/${id}/${avatar}`
          document.getElementById('avatar').src = imagesrc;

            
          document.getElementById('avatar').classList.add('circular-avatar');

          document.getElementById('name').innerText = `${username}`;
          disin = true;
          ididscordid = `${id}`

          var userRef = db.collection('music').doc(ididscordid);
          userRef.get().then(function(doc) {
            if (doc.exists) {
              const data = doc.data();
              const musictime = data.musictime;

              document.getElementById('musictime').innerHTML = `Music Listened: ${musictime}`;

            } else {

              db.collection('music').doc(ididscordid).set({
                name: `${username}`
              }, { merge: true })

            }
          })
          document.getElementById('logoutdis').style.display = 'inline';
        })
        .catch(console.error);
    } else {
      document.getElementById('logindis').style.display = 'block'
    }
  }
};  
  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('tokenType');
    document.getElementById('logoutdis').style.display = 'none';
    document.getElementById('logindis').style.display = 'block';
  
    window.location.reload()
  }


  
function mineManually() {
  console.log("!");
  if (disin) {
    console.log("!");
    db.collection('music').doc(ididscordid).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const incrementValue = 1;
          const currentMusictime = data.musictime || 0;
          const newTokenCount = currentMusictime + incrementValue;
          
          db.collection('music').doc(ididscordid).set({
            musictime: newTokenCount
          }, { merge: true })
          .then(() => {
            console.log('Document successfully updated!');
          })
          .catch((error) => {
            console.error('Error updating token count:', error);
          });          
        } else {
          const incrementValue = 1;
          db.collection('music').doc(ididscordid).set({
            musictime: incrementValue
          }, { merge: true })
          .then(() => {
            console.log('Document successfully created!');
          })
          .catch((error) => {
            console.error('Error creating document:', error);
          });
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
      });
  }
}



function populateDropdown(data) {
  const dropdownContent = document.getElementById('dropdown-content');

  data.forEach((doc, index) => {
    const docData = doc.data();
    const docName = docData.name;
    const highestMusicTime = docData.musictime;

    const dropdownItem = document.createElement('a');
    dropdownItem.href = '#';
    dropdownItem.className = 'dropdown-item';
    dropdownItem.textContent = `${index + 1}) ${docName} - Listened to ${highestMusicTime} Music`;

    dropdownContent.appendChild(dropdownItem);
  });
}

function fire() {
  db.collection('music')
    .orderBy('musictime', 'desc')
    .limit(10)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        populateDropdown(querySnapshot.docs);
      } else {
        console.log('No documents found in the collection.');
      }
    })
    .catch((error) => {
      console.error('Error getting documents:', error);
    });
}

fire();
