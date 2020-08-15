import React, { useState } from 'react';
import employees from "./employees.json";

import Wrapper from "./components/Wrapper";
import Heading from "./components/Heading";
import Paragraph from "./components/Paragraph";
import Table from "./components/Table";
import TableData from "./components/TableData";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import THead from './components/THead';
import TBody from './components/TBody';
import Form from './components/Form';
import Label from './components/Label';
import Select from './components/Select';
import Option from './components/Option';

function App() {
  // Dummy state, used to force re-render
  const [updateView, setUpdateView] = useState(0);

  // Which filter is selected
  const filterElements = "filterElements";
  const noFilter = "No filter";
  const [filterSelect, setFilterSelect] = useState(noFilter);

  // Make copy of original data so that we can reset filter
  const [openCells, setOpenCells] = useState(employees);

  // Initialize the Departments list for the filter dropdown
  let departments = [];

  employees.forEach(item => {
    if (departments.indexOf(item.department) === -1) {
      departments.push(item.department);
    };
  });

  departments.sort();

  // Event handle for clicking on table's column headers, which will sort by that property
  function handleColClick(event) {
    const colName = event.target.dataset.text;
    const cells = openCells;

    function findCell(cell1, cell2) {
      if (cell1 < cell2) {
        return -1;
      }
      else if (cell1 > cell2) {
        return 1;
      }
      else {
        return 0;
      };
    };

    switch (colName) {
      case "ID": 
        cells.sort((a,b) => {return findCell(a.id, b.id)});
        break;
      case "First Name": 
        cells.sort((a,b) => {return findCell(a.firstname, b.firstname)});
        break;
      case "Last Name": 
        cells.sort((a,b) => {return findCell(a.lastname, b.lastname)});
        break;
      case "Title": 
        cells.sort((a,b) => {return findCell(a.title, b.title)});
        break;
      case "Department": 
        cells.sort((a,b) => {return findCell(a.department, b.department)});
        break;
      case "Office Number": 
        cells.sort((a,b) => {return findCell(a.officenum, b.officenum)});
        break;
      case "Extension": 
        cells.sort((a,b) => {return findCell(a.extension, b.extension)});
        break;
      case "Email": 
        cells.sort((a,b) => {return findCell(a.email, b.email)});
        break;
      default:
        cells.sort((a,b) => {return findCell(a.id, b.id)});
    };
    setOpenCells(cells);
    setUpdateView(updateView + 1);
  };

  // Event handler for a change in the department dropdown selection, which filters by that department
  function handleFilterChange(event) {
    const filter = event.target.value;
    setFilterSelect(filter);

    if (filter === noFilter) {
      setOpenCells(employees);
    }
    else {
      setOpenCells(employees.filter(emp => emp.department === filter));
    };
  };

  return (
    <Wrapper>
      <Heading>Company-Name Employee Directory</Heading>
      <span style={{ display: "none" }}>{updateView}</span> 
      <Paragraph>Click on column heading to sort by that column</Paragraph>
      <Table>
        <THead>
          <TableRow>
            <TableHeader handleColClick={handleColClick}>ID</TableHeader>
            <TableHeader handleColClick={handleColClick}>First Name</TableHeader>
            <TableHeader handleColClick={handleColClick}>Last Name</TableHeader>
            <TableHeader handleColClick={handleColClick}>Title</TableHeader>
            <TableHeader handleColClick={handleColClick}>Department</TableHeader>
            <TableHeader handleColClick={handleColClick}>Office Number</TableHeader>
            <TableHeader handleColClick={handleColClick}>Extension</TableHeader>
            <TableHeader handleColClick={handleColClick}>Email</TableHeader>
          </TableRow>
        </THead>
        <TBody>
          {openCells.map(employee => (
            <TableRow key={employee.id.toString()}>
              <TableData>{employee.id}</TableData>
              <TableData>{employee.firstname}</TableData>
              <TableData>{employee.lastname}</TableData>
              <TableData>{employee.title}</TableData>
              <TableData>{employee.department}</TableData>
              <TableData>{employee.officenum}</TableData>
              <TableData>{employee.extension}</TableData>
              <TableData>{employee.email}</TableData>
            </TableRow>
          ))}
        </TBody>
      </Table>
      <Form>
        <Label htmlFor={filterElements}>
          Filter by Department:
          <Select name={filterElements} value={filterSelect} onChange={handleFilterChange}>
            <Option key={0} value={noFilter}>{noFilter}</Option>
            {departments.map((dept, index)  => (
              <Option key={index+1} value={dept}>{dept}</Option>
            ))}
          </Select>
        </Label>
      </Form>
    </Wrapper>
  );
}

export default App;
