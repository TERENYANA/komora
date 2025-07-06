import { useEffect, useState } from "react";
import ContactAPI from "../../service/contact_api";
import styles from "../../assets/css/admin/adminproductlist.module.css";
import { Link } from "react-router-dom";
import type Contact from "@/model/Contact";

const itemsPerPage = 15;

const ContactAdmin = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const response = await new ContactAPI().selectAll();
				setContacts(Array.isArray(response.data) ? response.data : []);
			} catch (error) {
				console.error("Error fetching contacts:", error);
			}
		};

		fetchContacts();
	}, []);

	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentContacts = contacts.slice(indexOfFirst, indexOfLast);
	const totalPages = Math.ceil(contacts.length / itemsPerPage);

	return (
		<div className={styles.productlist}>
			<h1 className={styles.title}>Contact Administration</h1>
			
		
			
			{/* Scroll indicator for small screens */}
			<div className={styles.scrollIndicator}>
			Scroll horizontally to see all the data →
			</div>
			
			{/* Container with horizontal scroll */}
			<div className={styles.tableContainer}>
				<table>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Subject</th>
							<th className={styles.description}>Message</th>
							<th className={styles.actionsColumn}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentContacts.map((con) => (
							<tr key={con._id}>
								<td>{con._id as string}</td>
								<td>{con.name}</td>
								<td>{con.email || "N/A"}</td>
								<td>{con.subject || "N/A"}</td>
								<td className={styles.description}>{con.message || "N/A"}</td>
								<td className={styles.actionsColumn}>
									<Link 
										to={`/admin/SendEmail/${con._id}`}
										className={styles.btn}
									>
										Répondre
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			
			{/* Pagination buttons */}
			<div className={styles.pagination}>
				{Array.from({ length: totalPages }, (_, i) => (
					<button
						type="button"
						key={i}
						onClick={() => setCurrentPage(i + 1)}
						className={`${styles.pageButton} ${
							currentPage === i + 1 ? styles.active : ""
						}`}
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
};
export default ContactAdmin;