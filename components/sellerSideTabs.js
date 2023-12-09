import Link from "next/link";

export function SellerSideTabs () {
    return (
        <aside className="grid grid-cols-2 gap-3 bg-green-100 border border-green-300 rounded-md p-3">
            <Link href='/seller/create' className={styles.tabStyle}>Create</Link>
            <Link href='/seller/orders' className={styles.tabStyle}>Orders</Link>
            <Link href='/seller/listing' className={styles.tabStyle}>My listings</Link>
            <Link href='/profile' className={styles.tabStyle}>My profile</Link>
        </aside>
    )
}

const styles = {
    tabStyle:'h-20 flex justify-center items-center border border-green-400 bg-green-600 text-green-100 font-bold rounded-md p-2',
}