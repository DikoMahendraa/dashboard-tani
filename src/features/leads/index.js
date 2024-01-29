import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getLeadsContent } from "./leadSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewLeadModal = () => {
    dispatch(
      openModal({
        title: "Tambahkan produk baru",
        bodyType: MODAL_BODY_TYPES.LEAD_ADD_NEW,
      })
    );
  };

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary text-white"
        onClick={() => openAddNewLeadModal()}
      >
        + Tambah Produk
      </button>
    </div>
  );
};

function Leads() {
  const { leads } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeadsContent());
  }, [dispatch]);

  const deleteCurrentLead = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this lead?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE,
          index,
        },
      })
    );
  };

  return (
    <TitleCard
      title="Daftar Produk"
      topMargin="mt-2"
      TopSideButtons={<TopSideButtons />}
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
              <th>Harga</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, k) => {
              return (
                <tr key={k}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{`Pupuk ${k}`}</div>
                      </div>
                    </div>
                  </td>
                  <td>{`D32${k}`}</td>
                  <td className="font-semibold">{`2${k}`}</td>
                  <td>Dus</td>
                  <td>Cair</td>
                  <td>Rp. {`100.00${k}`}</td>
                  <td>
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => deleteCurrentLead(k)}
                    >
                      <TrashIcon color="red" className="w-5" />
                    </button>
                  </td>
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

export default Leads;
