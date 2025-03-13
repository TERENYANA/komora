type Category = {
    id: number;
    name: string;
    parent_id: number;
    category: Category;

};
export default Category;
