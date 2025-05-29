using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ComplaintPortal.DataAccess.Repository.Contracts
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id); // Changed to nullable
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity); // Synchronous, as EF tracks changes
        void Delete(T entity); // Synchronous, as EF tracks changes
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
    }
}
