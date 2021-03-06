import Navigation from '../components/navigation'
import Description from '../components/description'
import Footer from '../components/footer'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from "react";

export default function AssistedSearch({ plagueSymptoms, diseaseSymptoms }) {

  const tree = new BinarySeachTree()

  const [currentInfection, setCurrentInfection] = useState({})

  const [currentSymptom, setCurrentSymptom] = useState({})

  const [symptom, setSymptom] = useState('')

  const [infection, setInfection] = useState('')

  const [infectionId, setInfectionId] = useState('')

  const [flag, setFlag] = useState(false)

  const [showResult, setShowResult] = useState(false)

  const [isFound, setIsFound] = useState(false)

  function createBinarySeachTree(list) {
    for (var i = 0; i < list.length; i++)
      tree.insert(list[i])
  }

  const choosePlage = () => {
    createBinarySeachTree(plagueSymptoms)
    setSymptom(tree.root.value.sintomaComentario.toLowerCase())
    setCurrentInfection(tree.root)
    setCurrentSymptom(tree.root)
    setFlag(true)
  }

  const chooseDisease = () => {
    createBinarySeachTree(diseaseSymptoms)
    setSymptom(tree.root.value.sintomaComentario.toLowerCase())
    setCurrentInfection(tree.root)
    setCurrentSymptom(tree.root)
    setFlag(true)
  }

  const answerYes = () => {
    if (currentSymptom.left != null || currentSymptom.right != null) { //si no hay sintoma en izq y der
      if (currentSymptom.left != null) { //si hay sintoma en izq
        setSymptom(currentSymptom.left.value.sintomaComentario.toLowerCase())
        setCurrentSymptom(currentSymptom.left)
      } else {
        setInfection(currentInfection.value.infeccionNombre)
        setInfectionId(currentInfection.value.infeccionId)
        setShowResult(true)
        setIsFound(true)
      }
    } else {
      setInfection(currentInfection.value.infeccionNombre)
      setInfectionId(currentInfection.value.infeccionId)
      setShowResult(true)
      setIsFound(true)
    }
  }

  const answerNo = () => {
    if (currentInfection.right != null) {
      if (currentSymptom.right != null) {
        setSymptom(currentSymptom.right.value.sintomaComentario.toLowerCase())
      } else {
        setSymptom(currentInfection.right.value.sintomaComentario.toLowerCase())
      }
      setCurrentSymptom(currentInfection.right)
      setCurrentInfection(currentInfection.right)
    } else {
      setShowResult(true)
      setIsFound(false)
    }
  }
  return (
    <div>

      <Description />

      <Navigation />
      <main className="celular:w-full md:mx-auto md:w-2/3 min-h-screen">
        <div className='flex flex-col'>
          <div className='celular:pt-10 celular:py-5 md:py-10 celular:pl-10'>
            <h1 className='font-bold celular:text-4xl md:text-5xl '>B??squeda guiada</h1>
          </div>
          <div className='flex md:grid grid-cols-3 celular:flex-col md:pt-6 justify-center'>
            <div className='flex md:flex-row celular:mx-4 col-span-2 celular:flex-col md:ml-10 items-center'>
              <Image layout='intrinsic' width={350} height={350} objectFit='cover' src='/pensando.png' alt='assistedImage' />
              {showResult || <div className='flex flex-col justify-center shadow-lg border rounded-lg md:ml-2 celular:mx-2 md:mr-20 p-12 h-52 w-80'>
                <div className='py-2'>
                  {flag || <p className='flex w-56 font-semibold text-center'>??El cultivo de papa est?? siendo afectado por una plaga?</p>}
                  {flag && <p className='flex w-56 font-semibold text-center'>??El cultivo de papa presenta {symptom}?</p>}
                </div>
                <div className='flex flex-row justify-center space-x-4 text-sm py-2'>
                  {flag || <button onClick={choosePlage} className='rounded-md w-24 h-7 bg-skyblue text-white'>S??</button>}
                  {flag || <button onClick={chooseDisease} className='rounded-md w-24 h-7 bg-bluebuscar text-white'>No</button>}
                  {flag && <button onClick={answerYes} className='rounded-md w-24 h-7 bg-skyblue text-white'>S??</button>}
                  {flag && <button onClick={answerNo} className='rounded-md w-24 h-7 bg-bluebuscar text-white'>No</button>}
                </div>
              </div>}
              {showResult && <div className='flex flex-col justify-center shadow-lg border rounded-lg md:ml-2 celular:mx-2 md:mr-20 p-12 h-52 w-80'>
                {isFound && <div className='py-2'>
                  <p className='flex justify-center w-56 font-bold text-center'>B??squeda finalizada</p>
                  <p className='flex justify-center w-56 font-normal text-center'>La infecci??n es</p>
                  <Link href={`/search/${encodeURIComponent(infectionId)}`}>
                    <a className='flex justify-center w-56 font-normal underline text-center'>{infection}</a>
                  </Link>
                </div>}
                {isFound || <div className='py-2'>
                  <p className='flex justify-center w-56 font-semibold text-center'>No se encontr?? respuesta</p>
                </div>}
              </div>}
            </div>
            <div className='flex flex-col celular:mx-12 celular:py-12 md:mx-4 md:py-10'>
              <div className='flex justify-center mb-8 mt-12'>
                <Image width={422} height={300} objectFit="cover" src="/cultivating.svg" alt="agricultor image" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

async function getDataDisease() {
  const data = await fetch("http://search-ontologia.azurewebsites.net/search/guided/enfermedad")
  const jsondata = await data.json()

  return jsondata
}

async function getDataPlague() {
  const data = await fetch("http://search-ontologia.azurewebsites.net/search/guided/plaga")
  const jsondata = await data.json()

  return jsondata
}

export async function getStaticProps() {
  const dataPlague = await getDataPlague()
  const dataDisease = await getDataDisease()

  return {
    props: {
      plagueSymptoms: dataPlague,
      diseaseSymptoms: dataDisease,
    },
  };
}

class ThreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class BinarySeachTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new ThreeNode(value, null, null);
    if (!this.root) {
      this.root = newNode;
    } else {
      let currentNode = this.root;
      let isFound = false;
      while (!isFound) {
        if (value === currentNode.value) {
          isFound = true;
          return;
        }
        if (value !== currentNode.value) {
          if (value.infeccionId == currentNode.value.infeccionId) {
            if (!currentNode.left) {
              currentNode.left = newNode;
              isFound = true;
              return;
            } else {
              currentNode = currentNode.left;
            }
          }
          if (value.infeccionId != currentNode.value.infeccionId) {
            if (!currentNode.right) {
              currentNode.right = newNode;
              isFound = true;
              return;
            } else {
              currentNode = currentNode.right;
            }
          }
        }
      }
    }
  }
}