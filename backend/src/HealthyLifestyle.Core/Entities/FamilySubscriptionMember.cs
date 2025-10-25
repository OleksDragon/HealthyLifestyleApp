using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthyLifestyle.Core.Entities
{
    public class FamilySubscriptionMember : BaseEntity
    {
        public Guid SubscriptionId { get; set; }
        public Subscription Subscription { get; set; } = null!;

        public Guid MemberId { get; set; }
        public User Member { get; set; } = null!;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
}
