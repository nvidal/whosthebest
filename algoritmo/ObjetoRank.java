
public class ObjetoRank {
	
	private JugadorRank jugador;
	private int multiplicador;
	
	
	public ObjetoRank(JugadorRank j, int multi){
		this.jugador =j;
		this.multiplicador = multi;
	}
	
	public void restarMulti(){
		this.multiplicador--;
	}
	
	public JugadorRank getJugador() {
		return jugador;
	}
	public void setJugador(JugadorRank jugador) {
		this.jugador = jugador;
	}
	public int getMultiplicador() {
		return multiplicador;
	}
	public void setMultiplicador(int multiplicador) {
		this.multiplicador = multiplicador;
	}
	
	

}
