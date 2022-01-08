import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { insert, changeState, deleteTodo, selectTodo, editTodo } from './TodoSlice';
import { CheckIcon } from '@heroicons/react/solid'


function Todo() {
	const dispatch = useAppDispatch();
	const todoSelect = useAppSelector(selectTodo);
	const [data, setdata] = useState('');
	const [changeData, setChangeData] = useState(1);
	const [changeDatas, setChangeDatas] = useState('');

	function showInput(e: any, id: number) {
		e.preventDefault();

		console.log('#item_' + id);
		const value = document.querySelector('#item_' + id);
		console.log(value);
	}
	return (
		<div style={{ padding: '15px' }} className="flex flex-col border-x h-fit">
			<p className="flex justify-center text-9xl text-blue-600/50 font-bold mx-4 my-4">Todo List</p>
			<div className="flex my-4">
				<input
					className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none shadow-sm shadow-emerald-400"
					type="text"
					value={data}
					placeholder="Write Todo ..."
					onChange={(e) => {
						setdata(e.target.value);
					}}
				/>
				<button
					className="flex-shrink-0 shadow-md bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
					style={{ margin: '10px' }}
					type="submit"
					onClick={() => {
						dispatch(insert(data));
						setdata('');
					}}
				>
					Add
				</button>
				<button
					className="flex-shrink-0 shadow-md bg-teal-200 hover:bg-teal-500 border-teal-200 hover:border-teal-500 text-sm border-4 text-black rounded"
					onClick={() => {
						console.log(todoSelect);
					}}
				>
					console.log
				</button>
			</div>

			<div className="flex flex-col justify-between">
				{todoSelect.map((item) => {
					if (item.state) {
						return (
							<div className="flex flex-row items-center justify-between p-3 shadow-md">
								<span
									style={{ margin: '2px 5px' }}
									className="text-black line-through px-2 flex"
								>
									{item.text}
									<CheckIcon className="h-5 w-5 text-green-500 mx-2" />
								</span>
								<button
									className="bg-orange-400 hover:bg-orange-700 p-1 rounded-sm shadow-xl text-red-200"
									type="submit"
									onClick={() => {
										dispatch(changeState({ state: !item.state, id: item.id, text: item.text }));
									}}
								>
									Un Done
								</button>
							</div>
						);
					} else {
						return (
							<div className="flex flex-row items-center justify-between p-3 shadow-md">
								{changeData === item.id ? (
									<>
										<div>
										<input
											className="p-1 shadow-sm"
											type="text"
											value={changeDatas}
											onChange={(e) => {
												setChangeDatas(e.target.value);
											}}
										/>
										</div>
										<div>
										<button
										className=" bg-blue-400 hover:bg-blue-700 p-1 rounded-sm shadow-xl text-blue-200"
											type="submit"
											onClick={() => {
												dispatch(editTodo({ id: item.id, text: changeDatas }));
												setChangeData(1.5);
											}}
										>
											Save Change
										</button>
										</div>
									</>
								) : (
									<>
										<div>
											<span style={{ margin: '2px 5px' }} className="rounded-sm p-2 text-black">
												{item.text}
											</span>
										</div>
										<div className="flex items-center">
											<button
												className="bg-blue-400 hover:bg-blue-700 p-1 rounded-sm shadow-xl text-blue-200"
												type="submit"
												onClick={() => {
													dispatch(
														changeState({
															state: !item.state,
															id: item.id,
															text: item.text,
														})
													);
												}}
											>
												Done
											</button>
											<button
												className="bg-red-400 hover:bg-red-700 p-1 mx-2 rounded-sm shadow-xl text-red-200"
												type="submit"
												onClick={() => {
													dispatch(deleteTodo(item.id));
												}}
											>
												Delete
											</button>
											<button
												className="bg-pink-400 hover:bg-pink-700 p-1 rounded-sm shadow-xl text-pink-400 text-orange-50"
												type="submit"
												onClick={(e) => {
													setChangeData(item.id);
													showInput(e, item.id);
													setChangeDatas(item.text);
												}}
											>
												Edit
											</button>
										</div>
									</>
								)}
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}

export default Todo;
