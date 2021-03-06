package com.example.coquille.controllers.Sequence.levels

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.coquille.R
import com.example.coquille.models.games.Sequence.Sequence
import com.example.coquille.utils.FigureConstants
import kotlin.random.Random


class Sequence_stage2 : Fragment(R.layout.fragment_sequence_stage2) {

    //Se declaran los componentes dentro del layout XML, que se van a usar a modificar
    lateinit var figura1: ImageView
    lateinit var figura2: ImageView
    lateinit var figura3: ImageView
    lateinit var figura4: ImageView
    lateinit var figura5: ImageView
    lateinit var figura6: ImageView
    lateinit var figura7: ImageView
    lateinit var option1: ImageButton
    lateinit var option2: ImageButton
    lateinit var option3: ImageButton
    lateinit var gameState: Sequence
    lateinit var puntos: TextView
    lateinit var timer: TextView
    //Variables para poder convertir y pasar el valor de los puntos a Strings y poder ser mostrado en el TextView y el Popup
    var pointsString: String = ""
    var pointsInt: Int = 0

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val rootView = inflater.inflate(R.layout.fragment_sequence_stage2, container, false)

        //Mediante el rootView, se obtienen los id de los elementos que se van a usar del layout, previamente declarados en variables.
        figura1 = rootView.findViewById(R.id.figure1)
        figura2 = rootView.findViewById(R.id.figure2)
        figura3 = rootView.findViewById(R.id.figure3)
        figura4 = rootView.findViewById(R.id.figure4)
        figura5 = rootView.findViewById(R.id.figure5)
        figura6 = rootView.findViewById(R.id.figure6)
        figura7 = rootView.findViewById(R.id.figure7)
        option1 = rootView.findViewById(R.id.option1)
        option2 = rootView.findViewById(R.id.option2)
        option3 = rootView.findViewById(R.id.option3)
        puntos = rootView.findViewById(R.id.puntos)
        timer = rootView.findViewById(R.id.timer2)

        //Se llama a la funci??n de generar secuencia para empezar.
        genSequence()

        //Se declaran valores iniciales
        gameState = Sequence(10, 0, figura1, figura2, figura3, option1, option2, option3, "O P T I M O", "B O L U D O")

        //Se llaman a las funciones que validan las opciones correctas.
        validateOption(figura1, option1)
        validateOption2(figura1, option2)
        validateOption3(figura1, option3)

        return rootView
    }

    //Funci??n que genera la primera secuencia.
    fun genSequence( ) {

        /*Mediante un random, de 0 a la longitud de la lista que llamamos del objeto FigureConstants
        * dentro de la misma buscamos la lista con valores correspodientes*/
        val randomIndex = Random.nextInt(0, FigureConstants.colorfulLvl2_1.size)

        //Mediante la variable imageToUse se almacena una de las imagenes dentro de la lista correspodiente
        val imageToUse = FigureConstants.colorfulLvl2_1[randomIndex]
        val imageResource = resources.getIdentifier(imageToUse, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse2 = FigureConstants.colorfulLvl2_2[randomIndex]
        val imageResource2 = resources.getIdentifier(imageToUse2, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse3 = FigureConstants.colorfulLvl2_3[randomIndex]
        val imageResource3 = resources.getIdentifier(imageToUse3, null, context?.packageName)

        // Se llena la lista mutable con los valores de los imagesResourse
        val list = mutableListOf(imageResource, imageResource2, imageResource3)
        // Se crea una segunda lista mutable, donde se almacenar?? las im??genes de manera aleatoria, para poder crear distintas secuencias .
        val list2 = mutableListOf<Int>()

        while (list.size > 0){

            //Se genera un numero aleatorio 0 al tama??o de la listaMutable listToSort
            val randomIndex2 = Random.nextInt(0, list.size)
            //Se obtiene ese valor de la lista mutable
            val comparacion = list[randomIndex2]
            //Cuando se obtiene el numero se remueve de la lista
            list.removeAt(randomIndex2)
            // Se agrega el valor removido a la nueva lista mutable
            list2.add(comparacion)

        }

        //Se asigna a cada imagen un valor para que sea tomado de la segunda lista
        option1.setBackgroundResource(list2[0])
        option2.setBackgroundResource(list2[1])
        option3.setBackgroundResource(list2[2])

        figura1.setImageResource(imageResource)
        figura2.setImageResource(imageResource)
        figura3.setImageResource(imageResource3)
        figura4.setImageResource(imageResource2)
        figura5.setImageResource(imageResource)
        figura6.setImageResource(imageResource)
        figura7.setImageResource(imageResource3)

        //Se asigna a la primera imagen el valor del valor del patron que sera correcto
        figura1.tag = imageResource2
        option1.tag = list2[0]
        option2.tag = list2[1]
        option3.tag = list2[2]

    }

    //Funci??n que genera la segunda secuencia.
    fun genSequence2( ) {

        /*Mediante un random, de 0 a la longitud de la lista que llamamos del objeto FigureConstants
        * dentro de la misma buscamos la lista con valores correspodientes*/
        val randomIndex = Random.nextInt(0, FigureConstants.colorfulLvl2_1.size)

        //Mediante la variable imageToUse se almacena una de las imagenes dentro de la lista correspodiente
        val imageToUse = FigureConstants.colorfulLvl2_3[randomIndex]
        val imageResource = resources.getIdentifier(imageToUse, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse2 = FigureConstants.colorfulLvl2_4[randomIndex]
        val imageResource2 = resources.getIdentifier(imageToUse2, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse3 = FigureConstants.colorfulLvl2_5[randomIndex]
        val imageResource3 = resources.getIdentifier(imageToUse3, null, context?.packageName)

        // Se llena la lista mutable con los valores de los imagesResourse
        val list = mutableListOf(imageResource, imageResource2, imageResource3)
        // Se crea una segunda lista mutable, donde se almacenar?? las im??genes de manera aleatoria, para poder crear distintas secuencias .
        val list2 = mutableListOf<Int>()

        while (list.size > 0){

            //Se genera un numero aleatorio 0 al tama??o de la listaMutable listToSort
            val randomIndex2 = Random.nextInt(0, list.size)
            //Se obtiene ese valor de la lista mutable
            val comparacion = list[randomIndex2]
            //Cuando se obtiene el numero se remueve de la lista
            list.removeAt(randomIndex2)
            // Se agrega el valor removido a la nueva lista mutable
            list2.add(comparacion)

        }

        //Se asigna a cada imagen un valor para que sea tomado de la segunda lista
        option1.setBackgroundResource(list2[0])
        option2.setBackgroundResource(list2[1])
        option3.setBackgroundResource(list2[2])

        figura1.setImageResource(imageResource3)
        figura2.setImageResource(imageResource)
        figura3.setImageResource(imageResource3)
        figura4.setImageResource(imageResource2)
        figura5.setImageResource(imageResource2)
        figura6.setImageResource(imageResource3)
        figura7.setImageResource(imageResource)

        //Se asigna a la primera imagen el valor del valor del patron que sera correcto
        figura1.tag = imageResource3
        option1.tag = list2[0]
        option2.tag = list2[1]
        option3.tag = list2[2]

    }

    //Funci??n para la tercera secuencia
    fun genSequence3( ) {

        /*Mediante un random, de 0 a la longitud de la lista que llamamos del objeto FigureConstants
        * dentro de la misma buscamos la lista con valores correspodientes*/
        val randomIndex = Random.nextInt(0, FigureConstants.colorfulLvl2_1.size)

        //Mediante la variable imageToUse se almacena una de las imagenes dentro de la lista correspodiente
        val imageToUse = FigureConstants.colorfulLvl2_1[randomIndex]
        val imageResource = resources.getIdentifier(imageToUse, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse2 = FigureConstants.colorfulLvl2_3[randomIndex]
        val imageResource2 = resources.getIdentifier(imageToUse2, null, context?.packageName)

        //Se hace lo mismo con una lista diferente, para poder acceder a diferentes im??genes.
        val imageToUse3 = FigureConstants.colorfulLvl2_5[randomIndex]
        val imageResource3 = resources.getIdentifier(imageToUse3, null, context?.packageName)

        // Se llena la lista mutable con los valores de los imagesResourse
        val list = mutableListOf(imageResource, imageResource2, imageResource3)
        // Se crea una segunda lista mutable, donde se almacenar?? las im??genes de manera aleatoria, para poder crear distintas secuencias .
        val list2 = mutableListOf<Int>()

        while (list.size > 0){

            //Se genera un numero aleatorio 0 al tama??o de la listaMutable listToSort
            val randomIndex2 = Random.nextInt(0, list.size)
            //Se obtiene ese valor de la lista mutable
            val comparacion = list[randomIndex2]
            //Cuando se obtiene el numero se remueve de la lista
            list.removeAt(randomIndex2)
            // Se agrega el valor removido a la nueva lista mutable
            list2.add(comparacion)

        }

        //Se asigna a cada imagen un valor para que sea tomado de la segunda lista
        option1.setBackgroundResource(list2[0])
        option2.setBackgroundResource(list2[1])
        option3.setBackgroundResource(list2[2])

        figura1.setImageResource(imageResource2)
        figura2.setImageResource(imageResource2)
        figura3.setImageResource(imageResource)
        figura4.setImageResource(imageResource3)
        figura5.setImageResource(imageResource3)
        figura6.setImageResource(imageResource2)
        figura7.setImageResource(imageResource2)

        //Se asigna a la primera imagen el valor del valor del patron que sera correcto
        figura1.tag = imageResource
        option1.tag = list2[0]
        option2.tag = list2[1]
        option3.tag = list2[2]

    }

    //Se valida la respuesta correcta para el primer patr??n de secuencias
    fun validateOption2(image: ImageView, option: ImageButton) {
        option.setOnClickListener {
            //En caso de coincidir
            if(option.tag == image.tag){
                var puntitos: Int = 0
                //Se llama a la funci??n que calcula los puntos del usuario
                puntitos = gameState.calculatePoints()
                updatePuntuation(puntitos)
                genSequence2()
            }
        }

    }

    //Se valida la respuesta correcta para la segunda patr??n de secuencias
    fun validateOption3(image: ImageView, option: ImageButton) {
        option.setOnClickListener {
            //En caso de coincidir
            if(option.tag == image.tag){
                //Se llama a la funci??n que calcula los puntos del usuario
                var puntitos: Int = 0
                puntitos = gameState.calculatePoints()
                updatePuntuation(puntitos)
                genSequence3()
            }
        }

    }

    //Se valida la respuesta correcta para el tercer patr??n de secuencias
    fun validateOption(image: ImageView, option: ImageButton) {
        option.setOnClickListener {
            //En caso de coincidir
            if(option.tag == image.tag){
                //Se llama a la funci??n que calcula los puntos del usuario
                var puntitos: Int = 0
                puntitos = gameState.calculatePoints()
                updatePuntuation(puntitos)
                genSequence()
            }
        }

    }

    //Funci??n que actualiza los puntos, tranformando su valor de Int a String
    fun updatePuntuation(points: Int){
        puntos.text = points.toString()
    }

}