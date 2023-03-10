import React, { useContext,Fragment } from "react";
import _ from "lodash";
import { AppContext } from "../context/Context";


const TableBody = ({ columns, data,func }) => {
  const { dimensions } = useContext(AppContext);
 
  
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  // const createKey = (item, column) => {
  //   return item._id + (column.path || column.key);
  // };
  return (
    <tbody>
      {data.map((item, index) => {
        if (dimensions.width < 900) {
          return (
            <Fragment key={index}>
              {columns.map((column, idx) => (
                <tr key={idx} className={`border-top ${idx===0 && ' border-danger'} `}>
                  <td className="col-6 col-sm-4 border-0 bg-secondary text-white  text-center  align-middle">
                    {column.label || "_"}
                  </td>
                  <td className={"col-6 col-sm-8 border-0 bg-white text-center  align-middle" + (func && func(item,column.path))  }>
                    <small>{renderCell(item, column)}</small>
                  </td>
                </tr>
              ))}
            </Fragment>
          );
        } else {
          return (
            <tr key={index} >
              {columns.map((column, idx) => (
                <td className={"text-center border-right bg-white" + (func && func(item,column.path))  } key={idx} >
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          );
        }
      })}
    </tbody>
  );
};

export default TableBody;
