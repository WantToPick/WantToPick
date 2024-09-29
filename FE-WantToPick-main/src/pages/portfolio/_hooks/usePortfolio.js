import { useState, useEffect } from 'react';

export function usePortfolio(initialData = []) {
  const itemsPerPage = 9; // 페이지당 보여줄 항목 수
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [paginatedData, setPaginatedData] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목 관리

  useEffect(() => {
    // 초기 데이터를 설정합니다.
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    // 현재 페이지에 해당하는 데이터를 계산합니다.
    const offset = (currentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(offset, offset + itemsPerPage);
    setPaginatedData(paginatedItems);
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setSelectedItems([]); // 편집 모드가 변경될 때 선택된 항목을 초기화
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    const newData = data.filter(item => !selectedItems.includes(item.id));
    setData(newData);
    setSelectedItems([]);
  };

  return {
    currentPage,
    paginatedData,
    isEditing,
    selectedItems,
    totalPages,
    setCurrentPage,
    handleEditClick,
    handleSelectItem,
    handleDeleteSelected,
  };
}
