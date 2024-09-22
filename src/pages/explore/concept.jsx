import { Avatar, Card } from '@material-tailwind/react'
import React from 'react'

const conceptInfoDerecha = [
  {
    id: 1,
    title: 'What is Toponima?',
    img:'/img/caracol_small_about_blanco.png'
  },
  {
    id: 2,
    title: 'What is a toponym?',
    img:'/img/toponym.svg'
  },
  {
    id: 3,
    title: `What's in a name?`,
    img:'/img/what-is-a-name.png'
  },
]

const conceptInfoIzquierda = [
  {
    id: 4,
    title: 'Use Toponima at your school.',
    img:'/img/use_for_school_icon_blanco.png'
  },
  {
    id: 5,
    title: 'Use Toponima at your bussiness.',
    img:'/img/business_icon_blanco.png'
  },
  {
    id: 6,
    title: 'Follow us and share the story.',
    img:'/img/follow_icon_blanco.png'
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
                <div key={concept.id} className='flex items-center gap-4'>
                  <Avatar src={concept.img} sx={{ width: 12, height: 12 }} />
                  <h1>{concept.title}</h1>
                </div>
              ))
            }
          </div>
          <div>
            {
              conceptInfoIzquierda.map(concept => (
                <div key={concept.id} className='flex items-center gap-4'>
                  <Avatar src={concept.img} sx={{ width: 12, height: 12 }} />
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