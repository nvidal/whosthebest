
public class JugadorRank  implements Comparable<JugadorRank>{
	
	private int id;
	private double puntos;
	private int matches;
	private int ganadas;
	
	
	public JugadorRank(){
		
	}
	public JugadorRank(int id, long pts){
		this.id = id;
		this.puntos = pts;
		this.ganadas = 0;
		this.matches = 0;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getPuntos() {
		return puntos;
	}
	public void setPuntos(double puntos) {
		this.puntos = puntos;
	}
	public int getMatches() {
		return matches;
	}
	public void setMatches(int matches) {
		this.matches = matches;
	}
	public int getGanadas() {
		return ganadas;
	}
	public void setGanadas(int ganadas) {
		this.ganadas = ganadas;
	}
	
	@Override
	public int compareTo(JugadorRank o) {
		if (this.puntos > o.getPuntos())
			return -1;
		else if (this.puntos < o.getPuntos())
			return 1;
		else
			return 0;
	}
	
	

}
