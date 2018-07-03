import random
import networkx as nx
import matplotlib.pyplot as plt

class GraphGenerator:
    def __init__(self,nodes,edges):
        self.nb_nodes = nodes
        self.nb_edges = edges
      #  self.list_nodes = 
   
    def total_nb_edges(self):
        n = self.nb_nodes
        return (n*(n-1))/2

    def complete_graph(self):
        return None

    def create_total_dictionary(self):
        edges_dict = dict()
        nb = self.nb_nodes
        for n in range(0,nb):
            for m in range(0,n):
                edges_dict[n,m] = 1 
        return edges_dict
    
    def create_random_graph(self):
        dicti = GraphGenerator.create_total_dictionary(self)
        ks = list(dicti.keys())
        random.shuffle(ks)
        random_edges = list()
        nb = self.nb_edges
        for n in range(0,nb):
            random_edges.append(ks[n])
        return random_edges


def demo():
    x = GraphGenerator(14,10)
    GraphGenerator.create_total_dictionary(x)
    print 'Nb of nodes:' , x.nb_nodes
    print 'Nb of edges:', x.nb_edges

    rnd_graph = GraphGenerator.create_random_graph(x)
    print rnd_graph
    return x, rnd_graph



def main():
    x,graph = demo()
    G = nx.Graph()
    G.add_nodes_from(range(0,x.nb_nodes))
    G.add_edges_from(graph)
    nx.draw(G, with_labels=True, font_weight='bold')
    print "You will be shown a graph. The goal is to identify the first node that you wish to befriend. \n"
    print "Each time a graph is shown, just close the window when you are ready to continue.\n "
    print "\n"
    raw_input("Press ENTER to continue...\n")
    plt.show()
    plt.savefig("temp.pdf")
    befriended = list()

    x = input("Enter your first node :")
    befriended.append(x)
    print "Your first node is:",x, "\n"
    print "-------------------------------"
    print "End of first turn. \n"
    print "-------------------------------"

    print "The next graph show your friends (in blue) at the end of first turn."
    color_map = []
    for node in G:
        if node == x:
            color_map.append('blue')
        else: color_map.append('red')      
    nx.draw(G,node_color = color_map,with_labels = True)
    plt.show()

    print "The next graph show your friends (in blue) at the beginning of second turn. "
    color_map = []
    nbors = list(G.neighbors(x))
    nbors.append(x)
    print nbors
    for node in G:
        if (node in nbors ) :
            color_map.append('blue')
        else: color_map.append('red')      
    nx.draw(G,node_color = color_map,with_labels = True)
    plt.show()

    y = input( "Choose another node to befriend.")
    befriended.append(y)
    print "Your second node is:",y, "\n"
    print "-------------------------------"
    print "End of second turn. \n"
    print "-------------------------------"


    print "The next graph show your friends (in blue) at the end of second turn."
    color_map = []
    for node in G:
        if node in befriended or node in nbors:
            color_map.append('blue')
        else: color_map.append('red')      
    nx.draw(G,node_color = color_map,with_labels = True)
    plt.show()

    print "The next graph show your friends (in blue) at the beginning of third turn. "
    color_map = []
    for item in list(G.neighbors(y)):
        nbors.append(item)
    nbors.append(y)    
    print nbors
    for node in G:
        if (node in nbors ):
            color_map.append('blue')
        else: color_map.append('red')      
    nx.draw(G,node_color = color_map,with_labels = True)
    plt.show()




    

main()


