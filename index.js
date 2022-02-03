const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file😒');
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('unable to write the file😥');
      resolve('Write Successful');
    });
  });
};

//using async/await

const getDogPic = async () => {
  try {
    const readData = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${readData}`);

    const superAgentResponse = await superagent.get(
      `https://dog.ceo/api/breed/${readData}/images/random`,
    );
    console.log(superAgentResponse.body.message);

    await writeFilePro(
      `${__dirname}/dog-img.txt`,
      superAgentResponse.body.message,
    );

    console.log('Random dog photo saved.🥰');
  } catch (error) {
    console.log(error);
    throw error;
  }
  return '2: READY 🐶';
};

(async () => {
  try {
    console.log('1: Will get the dog pic!');

    const x = await getDogPic();
    console.log(x);

    console.log('3: Done getting dog pic!');
  } catch (error) {
    console.log('ERROR!💥');
  }
})();

/* using then and catch
getDogPic()
  .then((x) => {
    console.log(x);
    console.log('3: Done getting dog pic!');
  })
  .catch((err) => {
    console.log('ERROR!💥');
  });

  */

/* // Promises with then
readFilePro(`${__dirname}/dog.txt`)
  .then((readData) => {
    console.log(`Breed: ${readData}`);

    return superagent.get(
      `https://dog.ceo/api/breed/${readData}/images/random`,
    );
  })
  .then((superAgentResponse) => {
    console.log(superAgentResponse.body.message);

    return writeFilePro(
      `${__dirname}/dog-img.txt`,
      superAgentResponse.body.message,
    );
  })
  .then(() => console.log('Random dog photo saved.🥰'))
  .catch((error) => {
    console.log(error);
  });
*/
