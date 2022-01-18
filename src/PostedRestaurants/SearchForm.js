import React, { useState } from "react";
import "./SearchForm.css";

/** Serach widget.
 * 
 * Appears on CompanyList and JobList so these can be filtered down.
 * 
 * This comoponent doesn't *do* the searching, but it renders the search 
 * form and calls the `searchFor` function prop that runs in a parent to do the searching.
 * 
 * { CompanyList, JobList } -> SearchForm
 */

const SearchForm = ({ searchFor }) => {
    const [searchTerm, setSearchTerm] = useState("");

    /** Tell parent to filter */
    function handleSubmit(evt) {
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    /** Update form fields */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    return (
        <div>
            <form className="form-search" onSubmit={handleSubmit}>
                <input 
                    className="form-control input-search"
                    name="searchTerm"
                    placeholder="Enter restaurant name"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary mb-4 ms-5 res-search">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;