import { useCallback, useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData";
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import SearchBar from "../../components/Input/SearchBar";
import moment from "moment";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = useCallback(() => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  }, [removeFilter]);

  useEffect(() => {
    if (searchText === "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [applySearch, removeAppliedFilter, searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
      />
      {filterParam !== "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <button onClick={() => showFiltersAndApply(l)}>{l}</button>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <button onClick={() => removeAppliedFilter()}>Remove Filter</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

function Transactions() {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return t.location === params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  return (
    <TitleCard
      title="Daftar Transaksi"
      topMargin="mt-2"
      TopSideButtons={
        <TopSideButtons
          applySearch={applySearch}
          applyFilter={applyFilter}
          removeFilter={removeFilter}
        />
      }
    >
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Kode</th>
              <th>Jumlah</th>
              <th>Satuan</th>
              <th>Jenis Barang</th>
              <th>Status</th>
              <th>Tanggal pembelian</th>
            </tr>
          </thead>
          <tbody>
            {trans.map((l, k) => {
              return (
                <tr key={k}>
                  <td>{`Pupuk`}</td>
                  <td>{`DB3${k}`}</td>
                  <td>{`1${k}`}</td>
                  <td>{`kg`}</td>
                  <td>{`Cair`}</td>
                  <td>
                    <div className="badge badge-success text-white badge-outline">
                      lunas
                    </div>
                  </td>
                  <td>{moment(new Date()).format("DD MMM, yyyy")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="join mt-4">
          <button className="join-item btn btn-sm">1</button>
          <button className="join-item btn-sm btn">2</button>
          <button className="join-item btn btn-sm btn-disabled">...</button>
          <button className="join-item btn-sm btn">99</button>
          <button className="join-item btn-sm btn">100</button>
        </div>
      </div>
    </TitleCard>
  );
}

export default Transactions;
