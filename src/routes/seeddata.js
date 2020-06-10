const express = require('express')
const router = express.Router()

const InterviewModel = require('../models/interview')
const ProjectModel = require('../models/Project')
const TechnologyModel = require('../models/Technology')
const SchoolModel = require('../models/school')
const CompanyModel = require('../models/employer')
const RolesModel = require('../models/Role')

// Generate initial data
const interviews = [
  {
    contactName: 'Sydious Rose',
    companyName: 'Roses Family',
    city: 'Surrey',
    province: 'BC',
    country: 'CA',
    companyWebsite: 'https://www.smartbitsolution.com',
    interviewDate: '2020-05-11',
    timeSlot: '10:00AM',
    contactNumber: '7782350562'
  },
  {
    contactName: 'Hannah-Sydika Rose',
    companyName: 'Roses Empire',
    city: 'Surrey',
    province: 'BC',
    country: 'CA',
    companyWebsite: 'https://www.smartbitsolution.com',
    interviewDate: '2020-05-11',
    timeSlot: '10:30AM',
    contactNumber: '7782357986',
    dateCreated: Date.now
  }
]

const projects = [
  {
    title: 'Love Your Planet - Social Media Platform for Sustainability ',
    description: 'Phase 1 implementation - Development of Web Application and Back-End API Services using' +
            ' MERN Stack Development',
    startDate: '2020-04-07',
    completionDate: '2020-05-08',
    projectURL: 'https://lyp-world.herokuapp.com/'
  },
  {
    title: 'Corporate Re-Platform',
    description: 'Test Manager for Automation Engineers',
    startDate: '2019-02-15',
    completionDate: '2019-08-23',
    projectURL: 'https://corporatebanking.cibcfcib.com/login'
  },
  {
    title: 'My Island Home',
    description: 'My first responsive Website built using HTML, CSS and JavaScript',
    startDate: '2019-10-13',
    completionDate: '2019-10-18',
    projectURL: 'https://my-island-home.netlify.app/'
  },
  {
    title: 'Do U Remember Me?',
    description: 'My first JavaScript app to demonstrate my understanding based on my 6 weeks course',
    startDate: '2019-10-07',
    completionDate: '2019-10-18'
  }
]

const technologies = [
  {
    title: 'HTML5'
  },
  {
    title: 'CSS/SASS'
  },
  {
    title: 'JavaScript& JQuery'
  },
  {
    title: 'Bootstrap'
  },
  {
    title: 'Relational Design - SQL & NoSQL'
  },
  {
    title: 'React'
  },
  {
    title: 'Angular'
  },
  {
    title: 'Web Application Security'
  },
  {
    title: 'Full Stack JS with NodeJs, Express and MongoDB'
  },
  {
    title: 'PHP and Laravel'
  },
  {
    title: 'Cloud Services - Azure and Amazon Web Services'
  },
  {
    title: 'Agile project Methodology and code sharing with GitHub and Azure DevOps'
  }
]

const schools = [
  // {
  //   name: 'British Columbia Institute of Technology (BCIT)',
  //   address: '555 Seymour St. Vancouver, BC, V6B 3H6',
  //   program: 'Software Systems Developer - Web Programmer Option',
  //   startDate: '2019-09-01',
  //   endDate: '2020-05-08',
  //   award: 'Certificate',
  //   schoolUrl: 'https://www.bcit.ca/study/programs/699ccertt'
  // },
  {
    name: 'University of Technology, Jamaica',
    address: '237 Old Hope Road, Kingston 6, Jamaica, WI',
    program: 'Computing with Management Studies',
    startDate: '2007-11-01',
    endDate: '2010-06-01',
    award: 'Bachelor of Science',
    schoolUrl: 'http://www.utechjamaica.edu.jm/academics/colleges-faculties/fenc/scit'
  }
]

const employers = [
  {
    name: 'CIBC FirstCaribbean International Bank (Jamaica) Limited',
    address: '23-27 Knutsford Blvd, Kingston 5, Jamaica',
    companyURL: 'https://www.cibcfcib.com/'
  },
  {
    name: 'Compumart (Jamaica) Limited',
    address: '2 Seymour Avenue, Kingston 6, Jamaica',
    companyURL: 'https://www.netcommjamaica.com/'
  }
]

const roles = [
  {
    title: 'Test Manager',
    startDate: '2017-02-01',
    endDate: '2019-08-23'
  }
]

router.get('/', (req, res, next) => {
  const error = []
  const docs = []

  ProjectModel.collection.insert(projects, (e, proj) => {
    if (e) {
      error.push(e)
    } else {
      docs.push(proj)
    }
  })

  InterviewModel.collection.insert(interviews, (er, meeting) => {
    if (er) {
      error.push(er)
    } else {
      docs.push(meeting)
    }
  })

  TechnologyModel.collection.insert(technologies, (err, techs) => {
    if (err) {
      error.push(err)
    } else {
      docs.push(techs)
    }
  })

  SchoolModel.collection.insert(schools, (e, school) => {
    if (e) {
      error.push(e)
    } else {
      docs.push(school)
    }
  })

  CompanyModel.collection.insert(employers, (errors, work) => {
    if (errors) {
      error.push(errors)
    } else {
      docs.push(work)
    }
  })

  RolesModel.collection.insert(roles, (error, jobs) => {
    if (error) {
      error.push(error)
    } else {
      docs.push(jobs)
    }
  })

  if (error.length >= 0 || docs.length >= 0) {
    res.json({
      message: 'Successfully generated sample documents'
    })
  } else {
    res.json({ errors: error })
  }

  res.redirect('/')
})

module.exports = router
