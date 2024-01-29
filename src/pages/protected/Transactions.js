import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Transactions from "../../features/transactions";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Riwayat Transaksi" }));
  }, [dispatch]);

  return <Transactions />;
}

export default InternalPage;
