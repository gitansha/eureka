import './table.css';
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '../Pagination/Pagination';
import { isValidJson } from '../../assets/utils';
import { SI } from '../Si/SI';
import { Dropdown } from '../Dropdown/Dropdown';
import { Button } from '../Button/Button.jsx';
import { TextInput } from '../Textinput/TextInput';

export const Table = ({ type, inverted, input, siblingCount, sort, search, className,
  paginationProps: {
    paginationType
  }, 
  searchProps: {
    textinputType, placeholder, textinputDisabled, helpText, trailingIcon, error, value, onChange,
    textinputLeadIcon: {
        textinputIcon, textinputIconFamily
    }
  },
  ...props }) => {

  let mode;
  if (type === "lined") {
    mode = "sia-table-lined";
  } else if (type === "unlined") {
    mode = "sia-table-unlined";
  } else if (type === "alternate") {
    mode = "sia-table-alt";
  }

  let invertedClass = inverted ? "sia-table-inverted" : null;

  // rows per page to be shown
  let [rowsPerPage, setRowsPerPage] = useState(3);
    const getRowsPerPage = (val) => {
      // val is a string so make it into an integer
      setRowsPerPage(parseInt(val));
  }
 
  // set states for table sorting
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("Ascending");

  const sample = [
    { "Account": "Visa", "Date": "10-10-2020", "Amount": 200, "Terms": "2 Months" },
    { "Account": "Master", "Date": "08-10-2020", "Amount": 200, "Terms": "3 Months" },
    { "Account": "Cirrus", "Date": "10-12-2020", "Amount": 350, "Terms": "5 Months" },
    { "Account": "Visa", "Date": "25-03-1865", "Amount": 463, "Terms": "3 Months" },
    { "Account": "AMEX", "Date": "10-10-2020", "Amount": 400, "Terms": "12 Months" }
  ];
  const [data, setData] = useState(sample);

  // detect small screens
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    // Call handleResize initially to set the initial screen size
    handleResize();
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // icon to display when sorting
  let icon;
  // dark icon only when small screen size and not in inverted mode
  if (isTablet && !inverted) {
    icon = order === "Ascending" ? "keyboard-arrow-up" : "keyboard-arrow-down";
  } else {
    icon = order === "Ascending" ? "keyboard-arrow-up-light" : "keyboard-arrow-down-light";
  }

  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = page => {
    setCurrentPage(page);
  }

  // to handle error if control input in storybook is not a positive number
  if (rowsPerPage <= 0) {
    rowsPerPage = 1;
  }

  // update data when input changes
  useEffect (() => {
    if (input && isValidJson(input)) {
      setData(JSON.parse(input));
    }
  }, [input])


  // getting data to display in each page rather than all the data available
  // returns indices of first and last row of current page
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * rowsPerPage;
      const lastPageIndex = firstPageIndex + rowsPerPage;

    return [firstPageIndex, lastPageIndex];
    
  }, [currentPage, rowsPerPage]);

  // searchInput is to check against the options for dropdowns with search
  const [searchInput, setSearchInput] = useState("");
  // update searchInput when the input entered in search box changes
  const handleSearchChange = (newInput) => {
      setSearchInput(newInput)
  };

  if (input && isValidJson(input)) {
    // getting keys from data[0] for header names
    let keys = Object.keys(data[0]);

    // number of columns
    const columns = keys.length;
    // apply style for grid columns according to type of table
    let style = {};
    if (columns === 2) {
      style = {
          gridTemplateColumns: `1fr 3fr`,
      };
    } else {
      style = {
        gridTemplateColumns: `repeat(${columns}, auto)`
      }
    }

    
    let filteredData = [];

    if (searchInput.length > 0) {
      // only include rows that match the search input
      filteredData = data.filter((row) => {
        // each values array stores the values in each row in data
        const values = Object.values(row);
        for (const value of values) {
          // include that row if any value in the values array of that row matches the search input
          // toLowerCase is used to make the comparison case-insensitive
          if (value.toString().toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
          }
        }
        return false;
      })
    }
    
    const handleSorting = (sortField, sortOrder) => {
      // this only works when sort = true
      if (sort && sortField) {
        let sorted = [...data].sort((a, b) => {
          return (
            // compare values of the input strings based on the field to be sorted
            // `numeric: true` ensures that numeric values are treated correctly during comparison
            // multiply by -1 for descending order
            a[sortField].toString().localeCompare(b[sortField].toString(), 'en', {
              numeric: true,
            }) * (sortOrder === "Ascending" ? 1 : -1)
          );
        });
        
        if (sortField === "Date") {
            sorted = [...data].sort((a, b) => {
              // format date from DD-MM-YYYY to a Date object
              const formattedDate1 = new Date(a[sortField].split('-').reverse().join('-'));
              const formattedDate2 = new Date(b[sortField].split('-').reverse().join('-'));

              return (formattedDate1 - formattedDate2) * (sortOrder === "Ascending" ? 1 : -1);
            })
          } 
          // set data to sorted data
          setData(sorted);
      }
     };

    // accessor is the column name that is being sorted
    const handleSortingChange = (accessor) => {
      const sortOrder = accessor === sortField && 
      // if current order is Ascending, clicking will sort in Descending order
      order === 'Ascending' ? 'Descending' : 'Ascending';
      setSortField(accessor);
      setOrder(sortOrder);
      handleSorting(accessor, sortOrder);
    };

    // display filtered data only if there are rows that match the search input, else display data
    let dataUsed = filteredData.length === 0 ? data : filteredData;
  
    if (isTablet) {
      const getSortField = (val) => {
        setSortField(val);
      }
    
      const getOrder = (val) => {
        setOrder(val);
      }
      return (
        <div className={["sia-small-table", mode, invertedClass,`${className}`].join(' ')}>
          {/* only when search is set to true */}
          {search && <TextInput type={textinputType} placeholder={placeholder} disabled={textinputDisabled} helpText={helpText} trailingIcon={trailingIcon} error={error} inverted={inverted} value={searchInput} onChange={handleSearchChange}
                        leadIcon={{ icon: textinputIcon, family: textinputIconFamily }} />}
          {/* <TextInput placeholder="Search" value={searchInput} onChange={handleSearchChange}/>} */}

          {sort &&
          <div className='sia-small-table-sort'>
            <Dropdown options={JSON.stringify(data[0])} placeholder='Sort by' getSelectedValues={getSortField} inverted={inverted}/>
            <Dropdown options="{&quot;Ascending&quot;: &quot;Ascending&quot;,&quot;Descending&quot;: &quot;Descending&quot;}" placeholder='Order' getSelectedValues={getOrder} inverted={inverted}/>
            <Button label="Enter" rounded onClick={() => handleSorting(sortField, order)}/>
            </div>}

            {dataUsed.map((item, index) => (
              // create a mini table for each set of data
              <div className="each-sia-table" key={index}>
                  {Object.entries(item).map(([key, value], index) => (
                    // different row colour for alternate table with even index and odd index
                    <div className={"data-row" + (type === "alternate" ? (index % 2 === 0) ? " sia-table-alt-even" : " sia-table-alt-odd" : "")} key={key}>
                      <div className="sia-table-key">
                        {key}
                      </div>
                      <div className="sia-table-value">{value}</div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        );
    };
    // take the keys from the first table data
    keys = Object.keys(data[0]);
   
    return (    
      <div className={['sia-table-with-pagination',`${className}`, invertedClass].join(' ')}>
        <div className="sia-table-search-and-rows">
          {/* show textinput when search is set to true and empty div when there is no search (for grid) */}
          {search ? <TextInput type={textinputType} placeholder={placeholder} disabled={textinputDisabled} helpText={helpText} trailingIcon={trailingIcon} error={error} inverted={inverted} value={searchInput} onChange={handleSearchChange}
                          leadIcon={{ icon: textinputIcon, family: textinputIconFamily }} /> : <div></div>}
          <div></div> {/* empty div for spacing */}
          <Dropdown className="sia-table-show-rows" options={JSON.stringify({"10": "","25": "","50": "","100": ""})} placeholder='Show' inverted={inverted} getSelectedValues={getRowsPerPage}/>
        </div>
        <div className={["sia-table", mode].join(' ')} style={style}>
          {/* put keys into header and corresponding items into data rows */}
          {keys.map((key) => (
            <div className='header-row header-with-icon' key={key} onClick={() => handleSortingChange(key)}>
              {key}
              {/* the arrow is only shown for the column being sorted and only when sort = true */}
              {key === sortField && sort && <SI icon={icon} family="solid" onClick={() => handleSortingChange(key)}></SI>}
              </div>
          ))}
          {/* slice data according to the first and last row indices for each page */}
          {dataUsed.slice(currentTableData[0], currentTableData[1]).map((item, index) => (
              keys.map((key) => (
                <div className={"data-row" + (type === "alternate" ? (index % 2 === 0) ? " sia-table-alt-even" : " sia-table-alt-odd" : "") + (key === keys[0] ? " sia-data-row-left" : "") +  (key === keys[columns - 1] ? " sia-data-row-right" : "")} key={key}>
                  {item[key]}
                </div>
              ))
          ))}
        </div>


        <div className='sia-table-pagination'>
        <Pagination
          type={paginationType}
          inverted={inverted}
          currentPage={currentPage}
          totalData={data.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          siblingCount={siblingCount}
          />
        </div>
      </div>

    );
  }
  // input field empty or invalid format
  return (
    <div>No input or invalid JSON format. Please refer to the default example.</div>
  )
};


Table.propTypes = {
  /**
   * Type of Table.
   */
  type: PropTypes.oneOf(['lined', 'unlined', 'alternate']),
  /** 
   * Data to display in the table as JSON string.  The keys will be the header, and the values will be the data.
   */
  input: PropTypes.string,
  /** 
   * Number of pages to be shown beside current page before dots. For example, `siblingCount: 1` shows one page on either side of the current page if there are dots.
   */
  siblingCount: PropTypes.number,
  /**
   * Whether Table has search function.
   */
  search: PropTypes.bool,
  /**
   * Whether Table has sorting function.
   */
  sort: PropTypes.bool,
  /**
   * Whether Table is in dark mode.
   */
  inverted: PropTypes.bool,
  /**
   * Properties of Pagination component.
   */
  paginationProps: PropTypes.shape({
    paginationType: PropTypes.oneOf(['default', 'jumper'])
  }),
  /**
   * Properties of Search textinput.
   * 
   * `textinputIcon` and `textinputIconFamily` can be chosen from the `Icons` section in the sidebar. There is no icon if `textinputIcon` or `textinputIconFamily` is empty.
   */
  searchProps: PropTypes.shape({
    textinput: PropTypes.bool,
    textinputType: PropTypes.oneOf(['lined', 'outlined', 'filled']),
    placeholder: PropTypes.string,
    textinputDisabled: PropTypes.bool,
    helpText: PropTypes.string,
    trailingIcon: PropTypes.bool,
    error: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    textinputLeadIcon: PropTypes.shape ({
        textinputIcon: PropTypes.string,
        textinputIconFamily: PropTypes.string
    })
  })
};

Table.defaultProps = {
  paginationProps: {
    paginationType: "default"
  },
  searchProps:{
    textinputType: 'outlined',
    placeholder: 'Search',
    textinputDisabled: false,
    helpText: '',
    trailingIcon: false,
    error: false,
    textinputLeadIcon:{
        textinputIcon: "search",
        textinputIconFamily: "solid"
    },
  },
  type: 'lined',
  inverted: false,
  siblingCount: 1,
  search: false,
  sort: false,
  input: '[{"Account": "Visa","Date": "10-10-2020","Amount": 200,"Terms": "2 Months"}, {"Account": "Master","Date": "08-10-2020","Amount": 200,"Terms": "3 Months"},{"Account": "Cirrus","Date": "10-12-2020","Amount": 350,"Terms": "5 Months"},{"Account": "Visa","Date": "25-03-1865","Amount": 463,"Terms": "3 Months"}, {"Account": "AMEX","Date": "10-10-2020","Amount": 400,"Terms": "12 Months"}]'
};