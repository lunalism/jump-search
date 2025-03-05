export function QuickLinks() {
    return (
        <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">빠른 링크</h2>
            <div className="grid grid-cols-3 gap-4">
                <a href="#" className="text-blue-500 hover:underline">뉴스</a>
                <a href="#" className="text-blue-500 hover:underline">지도</a>
                <a href="#" className="text-blue-500 hover:underline">커뮤니티</a>
            </div>
        </div>
    );
}