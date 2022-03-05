import React, { useState, useEffect } from 'react'
import styles from './ScientistDomainPicker.module.css'
import { Dropdown } from 'semantic-ui-react';

function ScientistDomainPicker(props){

  function handleChange(e, { value }){
    props.setDomains({value})
  }

  // never use the character : in these topics
  const options = [
    {key: "Animal Sciences", text: "Animal Sciences", value: "Animal Sciences"},
    {text: "Behavioural and Social Sciences", value: "Behavioural and Social Sciences"},
    {text: "Biochemistry", value: "Biochemistry"},
    {text: "Biomedical and Health Sciences", value: "Biomedical and Health Sciences"},
    {text: "Cellular and Molecular Biology", value: "Cellular and Molecular Biology"},
    {text: "Chemistry", value: "Chemistry"},
    {text: "Computational Biology and Bioinformatics", value: "Computational Biology and Bioinformatics"},
    {text: "Earth and Environmental Sciences", value: "Earth and Environmental Sciences"},
    {text: "Embedded Systems", value: "Embedded Systems"},
    {text: "Energy, Sustainable Materials and Design", value: "Energy, Sustainable Materials and Design"},
    {text: "Engineering Mechanics", value: "Engineering Mechanics"},
    {text: "Environmental Engineering", value: "Environmental Engineering"},
    {text: "Materials Science", value: "Materials Science"},
    {text: "Mathematics", value: "Mathematics"},
    {text: "Microbiology", value: "Microbiology"},
    {text: "Physics and Astronomy", value: "Physics and Astronomy"},
    {text: "Plant Sciences", value: "Plant Sciences"},
    {text: "Robotics and Intelligent Machines", value: "Robotics and Intelligent Machines"},
    {text: "Systems Software", value: "Systems Software"},
    {text: "Translational Medical Science", value: "Translational Medical Science"},
  ]

  return(
    <div>
      <Dropdown
        multiple
        search
        selection
        clearable
        options={options}
        placeholder="Select domain"
        onChange={handleChange}
        >
      </Dropdown>
    </div>
  )
}

export default ScientistDomainPicker
