const host = 'http://127.0.0.1:3000/api'

const dateFormat = (value : any) => {
    return new Date(value).toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric' })
}

const formatPrix = (prix: number): string => {
    return prix.toLocaleString('fr-MG') + ' Ar';
  }

const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('fr-FR').format(value);
  }
export { host, dateFormat, formatPrix, formatNumber };