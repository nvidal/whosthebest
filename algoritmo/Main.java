import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;


public class Main {

	private static final int MULTI = 100;
	private static final float K_FACTOR = 0.10f;
	private static final int K_PLUS = 3;
	private static final long PTS_INI = 0;
	private static Random rnd = null;

	private static final int LIMITE_NIVEL_PROTEGIDO = 20;
	//Niveles para votacion
	private static final int N_PROTEGIDO = 32;
	private static final int NIVEL_1 = 32;
	private static final int NIVEL_2 = 24;
	private static final int NIVEL_3 = 16;
	//RESULATDOS
	private static final int PIERDE = 0;
	private static final int GANA = 1;
	
	private static final int TAMANIO = 100;

	
	private static List<ObjetoRank> ranking;
	private static List<JugadorRank> jugadores;
	
	
	public static void main (String [ ] args) {

		//Cargo los jugadores
		iniciarJugadores();
		
		//Inicializo la estructura
		inicializarColeccion();
		
		for (int i = 0; i<1600; i++){
			//Elijo la primera opcion
			int a = seleccionarA();
			
			//Elijo la segunda opcion
			int b = seleccionarB(a);
		
			System.out.println("Seleccion:\n"+i+": ["+ a+" vs "+b+"]");
			JugadorRank jA = obtenerJugador(a);
			JugadorRank jB = obtenerJugador(b);
			votar(jA, jB.getPuntos(), GANA);
			votar(jB, jA.getPuntos(), PIERDE);
			
		}
		
		imprimirRanking();
		imprimirObjectosRank();
	}
	
	// +++++++++++++ SELECCION ++++++++++++++++ //
	/**
	 * Auxiliar para cargar jugadores al TEST
	 */
	public static void iniciarJugadores(){
		jugadores = new ArrayList<JugadorRank>();
		for (int i=0; i<TAMANIO; i++){
			jugadores.add(new JugadorRank(i, PTS_INI));
		}
	}
	
	/**
	 * Inicializa la estructura (coleccion simplificada de jugadores)
	 * carga como factor inicial, MULTI, factor multiplicativo para la seleccion.
	 */
	public static void inicializarColeccion(){	
		// Lista de Objetos: genero con todos los jugadores y agrego el multiplicador.
		Main.ranking = new ArrayList<ObjetoRank>();
		for (JugadorRank j : jugadores ){
			ranking.add(new ObjetoRank(j, MULTI));
		}
	}

	/**
	 * Selecciona aleatoriamente el primer jugador para comparar.
	 * Calculo un valor para cada jugador (MULTI * rand()), elijo el mayor.
	 * De esta forma manejo la probabilidad de salir sorteado de cada uno.
	 * 
	 * Al jugador elegido, le resto 1 al valor MULTI, para que tenga menos probabilidad de salir de nuevo.
	 * 
	 * @return Devuelve el ID del jugador.
	 */
	public static int seleccionarA(){
		if (rnd == null){
			rnd = new Random();
		}
		int select = -1;
		double max = -1;
		//for(int i = 0; i< TAMANIO; i++){
		for (int i =0; i < ranking.size(); i++){	
			// Genero un valor random segun el multiplicador para cada jugador y me quedo con el mayor
			double result = ranking.get(i).getMultiplicador() * rnd.nextDouble();
			if (result > max){
				max = result;
				select = i;
			}
		}
		
		//Resto al MULTI de la opcion seleccionada.
		ObjetoRank oAux = ranking.get(select);
		oAux.restarMulti();
		ranking.set(select, oAux);
		//ranking.set(select, ranking.get(select).set);
		
		return ranking.get(select).getJugador().getId();
	}

	/**
	 * Selecciono el segundo jugador.
	 * Doy mas probabilidad (PLUS) a los jugadores "cercanos" (al puntaje) a distancia K de la primera opcion.
	 * 
	 * Al jugador elegido, le resto 1 al valor MULTI, para que tenga menos probabilidad de salir de nuevo.
	 */
	public static int seleccionarB(int idJugA){
		JugadorRank jugA = obtenerJugador(idJugA);
		//Calculo el rango de valores mas probables
		// desde ptsJugA - ptsJugA*factor, o desde 0;
		double tope1 = jugA.getPuntos() - (double)(jugA.getPuntos()* K_FACTOR);
		if (tope1<0)
			tope1 = 0;
		// hasta ptsJugA + ptsJugA*factor
		double tope2 = jugA.getPuntos() + (double)(jugA.getPuntos()* K_FACTOR);
		
		int select = -1;
		double max = -1;
		for (int i =0; i < ranking.size(); i++){
			// Para todos los jugadores distintos de opcion A
			JugadorRank jB = ranking.get(i).getJugador();
			if (jB.getId()!= idJugA){
				// Genero un valor random (segun multi y topes) y me quedo con el mayor
				double result = 0;
				if(jB.getPuntos()>= tope1 && jB.getPuntos()<= tope2) //si es cercano, calculo con PLUS.
					result = ranking.get(i).getMultiplicador() * rnd.nextDouble() * K_PLUS;
				else
					result = ranking.get(i).getMultiplicador() * rnd.nextDouble();
					
				if (result > max){
					max = result;
					select = i;
				}
			}
		}
		
		//Resto al MULTI de la opcion seleccionada.
		ObjetoRank oAux = ranking.get(select);
		oAux.restarMulti();
		ranking.set(select, oAux);
		//jugadores.set(select, jugadores.get(select)-1);
				
		return ranking.get(select).getJugador().getId();
	}
	//+++++++ FIN SELECCION +++++++++++++//
	
	//++++++++++ VOTACION +++++++++++//

	/**
	 * Calcula los puntos que gana o pierde el jugador segun el resultado de la votacion.
	 * Se actualizan los contadores del jugador y sus puntos.
	 * 
	 * @param j Jugador a modificar
	 * @param ptsRival Puntos en ranking de jugador rival
	 * @param resultado GANA o PIERDE
	 */
	public static void votar(JugadorRank j, double ptsRival, int resultado){
		double q1 = Math.pow(10, j.getPuntos()/400);
		double q2 = Math.pow(10, ptsRival/400);
		double esperado = q1 / (q1+q2);
		int nivel = obtenerNivel(j);
		double nuevoPts = j.getPuntos() + (nivel*(resultado - esperado));
		
		j.setGanadas(j.getGanadas()+resultado);
		j.setMatches(j.getMatches()+1);
		if (nuevoPts >0)
			j.setPuntos(nuevoPts);
	}
	
	/**
	 * Segun la cantidad de votaciones y los puntos del jugador, devuelve el nivel que le corresponde.
	 * @param j
	 * @return
	 */
	public static int obtenerNivel(JugadorRank j){
		if (j.getMatches() < LIMITE_NIVEL_PROTEGIDO || j.getPuntos()<= PTS_INI)
			return N_PROTEGIDO;
		else{
			int aux = (int) Math.round(j.getPuntos()/200);
			if (aux<4)
				return NIVEL_1;
			else if(aux<6)
				return NIVEL_2;
			else 
				return NIVEL_3;
		}
	}
	
	// +++++++++ FIN VOTACION ++++++++**
	
	//AUXILIARES
 	public static JugadorRank obtenerJugador(int id){
		for(JugadorRank j : jugadores){
			if(j.getId()==id)
				return j;
		}
		return null;
	}


	public static void imprimirObjectosRank(){
		System.out.println("Objetos en Rank:\n IdJugador - Multi");
		for (ObjetoRank o: ranking){
			System.out.println("["+o.getJugador().getId()+" - "+o.getMultiplicador()+"]");
		}
	}
	
	public static void imprimirRanking(){
		System.out.println("--------------------\n--Ranking:--\n IdJugador - PTS");
		Collections.sort(jugadores);
		int i = 1;
		for (JugadorRank j: jugadores){
			System.out.println(i+"-["+j.getId()+" ("+j.getMatches()+","+j.getGanadas()+")"+"] ----- ["+j.getPuntos()+"]");
			i++;
		}
	}
}

