"use client";

import { useState, useEffect } from 'react';
import {useEffectInterface} from '@interfaces/index';

export default function useFetch(url: string, options: useEffectInterface) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let wait = false;
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchGet(){
			if(!wait){
				setLoading(true);
			}
			try{
				const response = await fetch(url, { ...options, signal });
				if(!response.ok) throw new Error();
				const data = await response.json();
				if(!wait){
					setData(data);
				}
			} catch(e: any){
				if(!wait){
					setError(e.message);
				}
			} finally{
				if(!wait){
					setLoading(false);
				}
			}
		}

		fetchGet();

		// Função de cleanup para abortar a requisição se o componente for desmontado
		return () => {
			wait = true;
			controller.abort();
		}

	}, [url, options]);

	return { data, loading, error };
}