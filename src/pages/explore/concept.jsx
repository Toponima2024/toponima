import { Avatar, Card } from '@material-tailwind/react'
import React from 'react'

const conceptInfoDerecha = [
  {
    id: 1,
    title: 'What is Toponima?',
    img:'/img/toponima_icon.svg'
  },
  {
    id: 2,
    title: 'What is a toponym?',
    img:'/img/what_is_toponym.svg'
  },
  {
    id: 3,
    title: `What's in a name?`,
    img:'/img/what_is_a_name.svg'
  },
]

const conceptInfoIzquierda = [
  {
    id: 4,
    title: 'Use Toponima at your school.',
    img:'/img/school.svg'
  },
  {
    id: 5,
    title: 'Use Toponima at your bussiness.',
    img:'/img/bussiness.svg'
  },
  {
    id: 6,
    title: 'Follow us and share the story.',
    img:'/img/follow_us.svg'
  }

]

function ConceptPage() {
  return (
  <div className='container mt-5 mb-5'>
    <Card className='rounded-none bg-[#5bafc5] text-white p-4'>
    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
          <div>
            {
              conceptInfoDerecha.map(concept => (
                <div key={concept.id} className='flex items-center gap-4  my-4'>
                  <img src={concept.img} alt={concept.title} className='w-8 h-8' />
                  <h1>{concept.title}</h1>
                </div>
              ))
            }
          </div>
          <div>
            {
              conceptInfoIzquierda.map(concept => (
                <div key={concept.id} className='flex items-center gap-4 my-4'>
                  <img src={concept.img} alt={concept.title} className='w-8 h-8' />
                  <h1>{concept.title}</h1>
                </div>
              ))
            }
          </div>
        </div>
    </Card>
  </div>
  )
}

export default ConceptPage