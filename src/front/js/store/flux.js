const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user : {}
			
		},
		actions: {
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			setUser:(user) => {
				setStore({user})

			}
			}

			
		
		}
	};
;

export default getState;