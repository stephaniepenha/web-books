const normalize = function(data) {
  data.forEach((d, i) => {
    d.id = i
    d.price = 100.0
    d.formattedPrice = 'R$ 100,00'
    d.description =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat nunc vel sapien cursus hendrerit. Nunc vel nunc id quam gravida rhoncus a eget urna. Donec sit amet ligula porta, viverra risus quis, pulvinar felis. Proin sit amet lectus varius, tincidunt tortor fringilla, hendrerit tortor. Maecenas ac lacinia nibh. In eu nisl ante. Aliquam lobortis semper pulvinar. Pellentesque tortor urna, vehicula vitae sem non, hendrerit tempor nisi.'
  })

  return data
}
export default normalize
